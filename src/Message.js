"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const Validator_1 = require("./API/Validator");

class Message {
    constructor(message) {
        this.message = message;
        Validator_1.Validator.validate(message);
    }

    serialize() {
        const {number, ...message} = this.message;
        let rest;
        if (Array.isArray(number)) {
            rest = {numbers: number};
        }
        else {
            rest = {number};
        }
        return {
            ...rest,
            ...message
        };
    }
}

exports.Message = Message;
