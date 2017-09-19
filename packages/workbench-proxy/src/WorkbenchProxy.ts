import { ProxyUtils } from './ProxyUtils';

export class WorkbenchProxy {

    private commandMap: {
        [command: string]: (
            this: WorkbenchProxy,
            source: Window,
            command: string,
            postMessageId: string,
            request: any
        ) => void;
    } = {
        'Fetch': (source, command, postMessageId, request) => {
            this.fetch(source, command, postMessageId, request);
        },
        'Ping': (source, command, postMessageId, request) => {
            ProxyUtils.postMessage(
                source,
                {
                    ...request,
                    $$result: 'success',
                    data: 'Pong'
                }
            );
        },
        'Eval': (source, command, postMessageId, request) => {
            try {
                const geval = eval;
                geval(request.code);
            } catch (ex) {
                ProxyUtils.postMessageError(source, command, postMessageId, ex);
            }
            ProxyUtils.postMessage(
                source,
                {
                    $$command: command,
                    $$postMessageId: postMessageId,
                    $$result: 'success'
                });
        }
    };

    constructor() {
        this.errorHandler = this.errorHandler.bind(this);
        this.messageHandler = this.messageHandler.bind(this);
    }

    public errorHandler(event: ErrorEvent): void {
        this.currentErrorHandler(event);
    }

    public messageHandler(event: MessageEvent): void {
        // We only accept messages from ourselves
        if (event.source !== window) {
            return;
        }

        const origin = event.origin || (event as any).originalEvent.origin;
        const command = event.data.$$command;
        const postMessageId = event.data.$$postMessageId;
        const source = event.source;

        if (!origin || !command || !postMessageId) {
            // Something strange occurred, ignore the message.
            return;
        }

        this.processCommand(source, command, postMessageId, event.data);
    }

    private currentErrorHandler = (err: ErrorEvent) => { /* noop */ };

    /**
     * Processes the command according to the current state of the commandMap
     * @param command command to process
     * @param postMessageId Id of the request
     * @param request data of the request
     */
    private processCommand(source: Window, command: string, postMessageId: string, request: any) {
        if (this.commandMap[command]) {
            try {
                this.commandMap[command].call(this, source, command, postMessageId, request);
            } catch (ex) {
                ProxyUtils.postMessageError(source, command, postMessageId, ex);
            } finally {
                return;
            }
        }

        ProxyUtils.postMessage(
            source,
            {
                $$command: command,
                $$postMessageId: postMessageId,
                $$result: 'error',
                message: `Unknown or unsupported command: ${command}`
            } as ErrorResponse
        );
    }

    private async fetch(source: Window, command: string, postMessageId: string, request: any): Promise<void> {
        let fetchRequestInit: RequestInit = {
            cache: request.cache,
            credentials: request.credentials,
            method: request.method,
            mode: 'same-origin'
        };

        // IE/Edge fails when the header object is not explictly
        // a headers object.
        if (request.headers) {
            fetchRequestInit.headers = new Headers();
            for (let property of Object.keys(request.headers)) {
                fetchRequestInit.headers.append(property, request.headers[property]);
            }
        }

        // IE/Edge fails with a TypeMismatchError when GET 
        // requests have any body, including null.
        if (request.method.toUpperCase() !== 'GET') {
            fetchRequestInit.body = request.body;
            (fetchRequestInit as any).bodyUsed = true;
        }

        // Actually perform the fetch
        try {
            const response = await fetch(request.url, fetchRequestInit);
            const headers = {};
            if (typeof response.headers.forEach === 'function') {
                (response.headers as any).forEach((value, key, object) => {
                    headers[key] = value;
                });
            }

            let messageResponse: FetchResponse = {
                $$command: command,
                $$postMessageId: postMessageId,
                $$result: 'success',
                headers: headers,
                data: undefined,
                transferrableData: await response.arrayBuffer()
            };

            // Add additional properties -- IE/Edge do not support 'keys', 'entries', 'values', nor '..of' so whitelist the properties.
            for (let propertyKey of ['ok', 'redirected', 'status', 'statusText', 'type', 'url']) {
                (messageResponse as any)[propertyKey] = response[propertyKey];
            }

            ProxyUtils.postMessage(source, messageResponse);
        } catch (err) {
            ProxyUtils.postMessageError(source, command, postMessageId, err);
        }
    }
}