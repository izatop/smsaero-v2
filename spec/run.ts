import {test} from "./test";
import {clientSend} from "./tests/clientSend";
import {clientGetStatus} from "./tests/clientGetStatus";

(async function () {
    await test("client.send", clientSend);
    await test("client.getStatus", clientGetStatus);
})();
