"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function test(name, fn) {
    try {
        console.log(name, "run");
        await fn();
        console.log(name, "done");
    }
    catch (error) {
        console.log(name, "fail");
        console.log(error.stack);
    }
}
exports.test = test;
