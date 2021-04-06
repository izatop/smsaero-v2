# SMSAero V2

[SMSAero](https://smsaero.ru/description/api/) V2 client written in TypeScript.

## Install

`npm i smsaero-v2` or `yarn add smsaero-v2`

## Usage

Sending sms example:

```typescript
import {Client, Message} from "smsaero-v2";

// create a client instance with login/key
// and pass a timeout option (optional)
const client = new Client("login", "key", {timeout: 15000});
(async function () {
	const res = await api.send(new Message({
	  sign: "SMS Aero",
	  number: "79991112233", // num or [num1, num2, ...numN]
	  text: "Test message"
	}));

	console.log(res)
})();
```

Output format described in interfaces or SMSAero documentation.

## API

See TypeScript interfaces.
