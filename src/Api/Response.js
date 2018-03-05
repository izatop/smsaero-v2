"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

class Response {
    constructor(response) {
        this.id = response.id;
        this.from = response.from;
        this.number = response.number;
        this.text = response.text;
        this.status = response.status;
        this.extendStatus = response.extendStatus;
        this.channel = response.channel;
        this.dateCreate = response.dateCreate;
        this.dateSend = response.dateSend;
    }
}

exports.Response = Response;
