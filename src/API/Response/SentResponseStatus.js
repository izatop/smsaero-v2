"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
var ServerResponseStatus;
(function (ServerResponseStatus) {
    ServerResponseStatus[ServerResponseStatus["PENDING"] = 0] = "PENDING";
    ServerResponseStatus[ServerResponseStatus["DELIVERED"] = 1] = "DELIVERED";
    ServerResponseStatus[ServerResponseStatus["FAILED"] = 2] = "FAILED";
    ServerResponseStatus[ServerResponseStatus["TRANSFERRED"] = 3] = "TRANSFERRED";
    ServerResponseStatus[ServerResponseStatus["MODEATION"] = 8] = "MODEATION";
    ServerResponseStatus[ServerResponseStatus["DECLINED"] = 6] = "DECLINED";
    ServerResponseStatus[ServerResponseStatus["WAITING"] = 4] = "WAITING";
})(ServerResponseStatus = exports.ServerResponseStatus || (exports.ServerResponseStatus = {}));
