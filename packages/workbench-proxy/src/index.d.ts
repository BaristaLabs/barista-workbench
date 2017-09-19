interface CommandRequest {
    $$postMessageId: string;
    $$command: string;
}

interface CommandResponse {
    $$postMessageId: string;
    $$command: string;
    $$result: 'success' | 'error' | 'progress';
    data?: any;
    transferrableData?: ArrayBuffer;
}

interface FetchResponse extends CommandResponse {
    headers: { [key: string]: any };
    data: undefined;
    transferrableData: ArrayBuffer;
}

interface ErrorResponse extends CommandResponse {
    $$result: 'error';
    name?: string;
    message?: string;
    type?: string;
    stack?: string;
    originalError?: string;
    invalidOrigin?: string;
    url?: string;
    context?: string;
}

interface ProgressResponse extends CommandResponse {
    $$result: 'progress';
}