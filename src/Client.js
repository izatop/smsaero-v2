"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const https_1 = require("https");
const url_1 = require("url");
const req = (options) => {
    return new Promise(resolve => {
        https_1.request(options, (res) => {
            resolve(res);
        });
    });
};

class SMSAero {
    constructor(email, privateKey) {
        this.email = email;
        this.privateKey = privateKey;
        this.endpoint = "https://gate.smsaero.ru/v2";
        this.headers = {};
        const base64 = Buffer.from(`${email}:${privateKey}`, "utf-8")
            .toString("base64");
        this.headers = {
            Authorization: `Basic ${base64}`
        };
    }

    async send(message) {
        const response = await this.call('/sms/send', message.serialize());
    }

    async call(path, query) {
        const url = url_1.parse(`${this.endpoint}/${path}?${this.getQueryString(query)}`);
        const response = await req({
            method: "GET",
            port: url.port,
            path: url.path,
            hostname: url.hostname,
            protocol: url.protocol,
            headers: this.headers
        });
        return new Promise((resolve, reject) => {
            response.once("error", reject);
            response.once("readable", function () {
                let chunk;
                const chunks = [];
                try {
                    while (chunk = this.read()) {
                        chunks.push(chunk);
                    }
                    const result = Buffer.concat(chunks);
                    resolve(JSON.parse(result.toString("utf-8")));
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }

    getQueryString(query) {
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

exports.SMSAero = SMSAero;
