export class ProxyUtils {

    /**
     * Utility method to reject a promise if it does not settle within the specified timeout.
     * @param promise 
     * @param timeoutMillis 
     * @param errorMessage 
     */
    public static timeout(promise: Promise<any>, timeoutMillis: number, errorMessage?: string): Promise<any> {
        let timeout;

        return Promise.race([
            promise,
            new Promise((resolve, reject) => {
                timeout = setTimeout(() => { reject(new Error(errorMessage || 'Timeout Error')); }, timeoutMillis);
            })
        ]).then(
            (v) => {
                clearTimeout(timeout);
                return v;
            },
            (err) => {
                clearTimeout(timeout);
                throw err;
            });
    }

    /**
     * Utility method to post messages back to the parent.
     */
    public static postMessage(target: Window, message: CommandResponse): void {
        const responseOrigin = '*';

        if (!target || typeof target.postMessage !== 'function') {
            return;
        }

        target.postMessage(message, responseOrigin, message.transferrableData ? [message.transferrableData] : undefined);
    }

    /**
     * postMessage helper to facilitate posting errors back to the parent.
     * @param {*} postMessageId 
     * @param {*} err 
     */
    public static postMessageError(target: Window, command: string, postMessageId: string, err: any): void {
        let errorMessage: ErrorResponse = {
            $$command: command,
            $$postMessageId: postMessageId,
            $$result: 'error',
            message: err,
            type: Object.prototype.toString.call(err),
            context: 'proxy'
        };

        if (typeof err === 'object') {
            errorMessage.name = err.name;
            errorMessage.message = err.message;
            errorMessage.stack = err.stack;
            for (let key in err) {
                if (err.hasOwnProperty(key)) {
                    errorMessage[key] = err[key];
                }
            }

            // Prevent Events and nested Errors from preventing cloning.
            if (errorMessage.originalError) {
                errorMessage.originalError = JSON.stringify(errorMessage.originalError);
            }
        }
        this.postMessage(target, errorMessage);
    }

    /**
     * Posts a progress message to the parent window.
     * @param command 
     * @param postMessageId 
     * @param data 
     */
    public static postProgress(target: Window, command: string, postMessageId: string, data: any) {
        let progressMessage: ProgressResponse = {
            $$command: command,
            $$postMessageId: postMessageId,
            $$result: 'progress',
            data: data
        };

        this.postMessage(target, progressMessage);
    }
}