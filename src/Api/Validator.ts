import {Channels} from "../Channels";
import {MessageArguments} from "./MessageArguments";
import * as assert from "assert";
import {parse} from "url";

export const Validator = new class Validator {
    validateChannel(channel: Channels) {
        return channel in Channels;
    }

    validateText(text: string) {
        return typeof text === "string" && text.length > 0;
    }

    validateNumber(number: number | string | string[]): boolean {
        if (Array.isArray(number)) {
            return number.filter(number => this.validateNumber(number))
                .length === number.length;
        }

        let numberString = number;
        if (typeof numberString === "number") {
            numberString = numberString.toString();
        }

        if (typeof numberString !== "string") {
            return false;
        }

        return false !== /\d+/.test(numberString);
    }

    validate(message: MessageArguments) {
        assert("sign" in message, "Missing a sign field");
        assert("text" in message, "Missing a text field");
        assert("number" in message, "Missing a number field");
        assert(this.validateText(message.sign), "Invalid message sign");
        assert(this.validateText(message.text), "Invalid message text");
        assert(this.validateNumber(message.number), "Invalid message number");

        if (message.dateSend) {
            assert(typeof message.dateSend === "number", "A message dateSend field should be number");
        }

        if (message.callbackUrl) {
            const url = parse(message.callbackUrl);
            assert(!!url.protocol && !!url.hostname, "")
        }
    }
};
