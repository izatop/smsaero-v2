import {IncomingMessage} from "http";
import {request, RequestOptions} from "https";

export const req = (options: RequestOptions) => {
    return new Promise<IncomingMessage>(resolve => {
        options.timeout = 30000;

        request(options, (res) => {
            resolve(res);
        }).end();
    })
};