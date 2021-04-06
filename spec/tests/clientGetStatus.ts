import {Client, Message} from "../../src";
import * as assert from "assert";

export async function clientGetStatus() {
    const {TEST_ID, TEST_KEY, TEST_PHONE, TEST_MSG, TEST_SIGN}: any = process.env;
    assert(TEST_ID && TEST_KEY && TEST_PHONE, 'Please provide Id, Key and phone number');

    const api = new Client(TEST_ID, TEST_KEY);
    const res = await api.send(new Message({
        sign: TEST_SIGN || "SMS Aero", // or test sign
        number: TEST_PHONE,
        text: TEST_MSG || "Test message"
    }));

    const {data, status, message} = await api.getStatus(res.data!.id);
    assert(data);
    assert(!message);
    assert(status === true);
    assert(data!.number == TEST_PHONE);
}
