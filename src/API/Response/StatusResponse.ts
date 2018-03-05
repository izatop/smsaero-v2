import {SentResponseStatus} from "./SentResponseStatus";
import {Channels} from "../../Channels";
import {SentResponse} from "./SentResponse";

export interface StatusResponse extends SentResponse {
    dateAnswer: number;
}