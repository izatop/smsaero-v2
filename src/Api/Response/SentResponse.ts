import {SentResponseStatus} from "./SentResponseStatus";

export interface SentResponse {
    id: number;
    from: string;
    number: string | string[];
    text: string;
    status: SentResponseStatus;
    extendStatus: string;
    channel: string;
    cost: number;
    dateCreate: number;
    dateSend: number;
}
