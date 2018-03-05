"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./test");
const send_1 = require("./tests/send");
(async function () {
    await test_1.test("send", send_1.send);
})();
