import {SentResponseStatus} from "./SentResponseStatus";
import {Channels} from "../../Channels";

export interface SentResponse {
    id: number;
    from: string;
    number: string | string[];
    text: string;
    status: SentResponseStatus;
    extendStatus: string;
    channel: Channels;
    cost: number;
    dateCreate: number;
    dateSend: number;
}