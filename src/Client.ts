import {Message} from "./Message";
import {parse} from "url";
import {Readable} from "stream";
import {req} from "./req";
import {SentResponse} from "./Api/Response/SentResponse";
import {Envelope, Response} from "./Api/Response";
import {StatusResponse} from "./Api/Response/StatusResponse";
import {Channels} from "./Channels";
import {ListResponse} from "./Api/Response/ListResponse";

export type Options = {
    timeout?: number;
    headers?: { [key: string]: string };
}

export class Client {
    static Channels = Channels;

    protected endpoint = "https://gate.smsaero.ru/v2";

    constructor(private email: string, private privateKey: string, private options: Options = {}) {
        const base64 = Buffer.from(`${email}:${privateKey}`, "utf-8")
            .toString("base64");

        this.options.headers = {
            ...this.options.headers || {},
            Authorization: `Basic ${base64}`,
            Accept: "application/json",
        }
    }

    public async send<T extends Message>(message: T): Promise<Response<SentResponse>> {
        return new Response<SentResponse>(
            await this.call<Envelope<SentResponse>>('sms/send', message.serialize())
        );
    }

    public async getStatus(id: number): Promise<Response<StatusResponse>> {
        return new Response<StatusResponse>(
            await this.call<Envelope<StatusResponse>>('sms/status', {id})
        );
    }

    public async getList(filter: { number?: string; text?: string; page: number; }): Promise<Response<ListResponse>> {
        return new Response<ListResponse>(
            await this.call<Envelope<ListResponse>>('sms/list', filter)
        );
    }

    public async getBalance(): Promise<Response<{ balance: number }>> {
        return new Response<{ balance: number }>(
            await this.call<Envelope<{ balance: number }>>('balance', {})
        );
    }

    public async getTariffs(): Promise<Response<Record<string, Record<string, number>>>> {
        return new Response<Record<string, Record<string, number>>>(
            await this.call<Envelope<Record<string, Record<string, number>>>>('tariffs', {})
        );
    }

    public async testAuth(): Promise<Response<Response<null>>> {
        return new Response<Response<null>>(
            await this.call<Envelope<Response<null>>>('auth', {}),
        )
    }

    protected async call<T extends { [k: string]: any }>(path: string, query: object) {
        const url = parse(`${this.endpoint}/${path}?${this.getQueryString(query)}`);
        const response = await req({
            method: "GET",
            port: url.port,
            path: url.path,
            hostname: url.hostname,
            protocol: url.protocol,
            headers: this.options.headers,
            timeout: this.options.timeout || 5000
        });

        return new Promise<T>((resolve, reject) => {
            response.once("error", reject);
            response.once("readable", function (this: Readable) {
                let chunk: Buffer;
                const chunks: Buffer[] = [];

                try {
                    while (chunk = this.read()) {
                        chunks.push(chunk);
                    }

                    const result = Buffer.concat(chunks);
                    resolve(JSON.parse(result.toString("utf-8")));
                } catch (error) {
                    reject(error);
                }
            })
        });
    }

    protected getQueryString(query: { [key: string]: any }) {
        const parts = [];
        for (const [key, value] of Object.entries(query)) {
            if (["number", "string"].includes(typeof value)) {
                parts.push(`${key}=${encodeURIComponent(value)}`);
                continue;
            }

            if (Array.isArray(value)) {
                for (const item of value) {
                    parts.push(`${key}[]=${encodeURIComponent(item)}`);
                }

                continue;
            }

            throw new Error(`Invalid value for "${key}" part of a query`);
        }

        return parts.join('&');
    }
}
