import {Client} from "../../src";
import * as assert from "assert";
import {Message} from "../../src/Message";
import {Channels} from "../../src/Channels";
import {Response} from "../../src/API/Response";

export async function clientSend() {
    const {TEST_ID, TEST_KEY, TEST_PHONE, TEST_MSG, TEST_SIGN}: any = process.env;
    assert(TEST_ID && TEST_KEY && TEST_PHONE, 'Please provide Id, Key and phone number');

    const channel = Channels.INFO;
    const api = new Client(TEST_ID, TEST_KEY);
    const res = await api.send(new Message({
        channel,
        sign: TEST_SIGN || "SMS Aero", // or test sign
        number: TEST_PHONE,
        text: TEST_MSG || "Test message"
    }));

    assert(res instanceof Response);
    assert(!!res.data);
    assert(!res.message);
    assert(res.status === true);
    assert(res.data!.channel === channel);
    assert(res.data!.number === TEST_PHONE);
    assert(res.data!.from === TEST_SIGN);
}