"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const Channels_1 = require("../Channels");
const assert = require("assert");
const url_1 = require("url");
exports.Validator = new class Validator {
    validateChannel(channel) {
        assert(channel in Channels_1.Channels, `Unknown "${channel}", valid channels are ${Object.keys(Channels_1.Channels).join(', ')}`);
    }

    validateText(text) {
        return typeof text === "string" && text.length > 0;
    }

    validateNumber(number) {
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
        if (false === /\d+/.test(numberString)) {
            return false;
        }
        return true;
    }

    validate(message) {
        assert("channel" in message, "Missing a channel field");
        assert("sign" in message, "Missing a sign field");
        assert("text" in message, "Missing a text field");
        assert("number" in message, "Missing a number field");
        assert(this.validateText(message.sign), "Invalid message sign");
        assert(this.validateText(message.text), "Invalid message text");
        assert(this.validateChannel(message.channel), "Invalid message channel");
        assert(this.validateNumber(message.number), "Invalid message number");
        if (message.dateSend) {
            assert(typeof message.dateSend === "number", "A message dateSend field should be number");
        }
        if (message.callbackUrl) {
            const url = url_1.parse(message.callbackUrl);
            assert(!!url.protocol && !!url.hostname, "");
        }
    }
};
