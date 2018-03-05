import {Message} from "./Message";
import {parse} from "url";
import {Readable} from "stream";
import {req} from "./req";
import {SentResponse} from "./API/Response/SentResponse";
import {Envelope, Response} from "./API/Response";
import {StatusResponse} from "./API/Response/StatusResponse";

export type Options = {
    timeout?: number;
    headers?: { [key: string]: string };
}

export class Client {
    protected endpoint = "https://gate.smsaero.ru/v2";

    constructor(private email: string, private privateKey: string, private options: Options = {}) {
        const base64 = Buffer.from(`${email}:${privateKey}`, "utf-8")
            .toString("base64");

        this.options.headers = {
            Authorization: `Basic ${base64}`,
            ...this.options.headers || {}
        }
    }

    async send<T extends Message>(message: T) {
        return new Response<SentResponse>(
            await this.call<Envelope<SentResponse>>('sms/send', message.serialize())
        );
    }

    async getStatus(id: number) {
        return new Response<StatusResponse>(
            await this.call<Envelope<StatusResponse>>('sms/status', {id})
        );
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
                parts.push(`${key}=${encodeURI(value)}`);
                continue;
            }

            if (Array.isArray(value)) {
                for (const item of value) {
                    parts.push(`${key}[]=${encodeURI(item)}`);
                }

                continue;
            }

            throw new Error(`Invalid value for "${key}" part of a query`);
        }

        return parts.join('&');
    }
}