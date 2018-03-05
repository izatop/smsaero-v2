import {Channels} from "../Channels";

export interface MessageArguments {
    sign: string;
    text: string;
    number: string | string [];
    channel: Channels;
    dateSend?: number;
    callbackUrl?: string;
}
