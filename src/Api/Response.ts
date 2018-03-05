export type KV = { [key: string]: any };

export type Envelope<T extends KV> = {
    message: string | null;
    success: boolean;
    data?: T;
}

export class Response<T extends KV> {
    public data?: T;
    public status: boolean;
    public message?: string;

    constructor(response: Envelope<T>) {
        this.status = response.success;

        if (response.message) {
            this.message = response.message;
        }

        if (response.data) {
            this.data = response.data;
        }
    }
}