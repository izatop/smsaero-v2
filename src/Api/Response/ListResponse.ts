import {StatusResponse} from "./StatusResponse";

export interface ListResponse {
    links: {
        self: string;
        first: string;
        prev: string;
        next: string;
        last: string;
    };

    [key: number]: StatusResponse;
}
