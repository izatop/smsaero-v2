import {Client, Message, Response} from "../../src";
import * as assert from "assert";

export async function clientSend() {
    const {TEST_ID, TEST_KEY, TEST_PHONE, TEST_MSG, TEST_SIGN}: any = process.env;
    assert(TEST_ID && TEST_KEY && TEST_PHONE, 'Please provide Id, Key and phone number');

    const api = new Client(TEST_ID, TEST_KEY);
    const res = await api.send(new Message({
        sign: TEST_SIGN || "SMS Aero", // or test sign
        number: TEST_PHONE,
        text: TEST_MSG || "Test message"
    }));

    assert(res instanceof Response);
    assert(!!res.data);
    assert(!res.message);
    assert(res.status === true);
    assert(res.data!.number === TEST_PHONE);
    assert(res.data!.from === TEST_SIGN);
}
