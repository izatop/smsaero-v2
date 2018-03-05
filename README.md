# SMSAero API (v2)

This package contains a client library for working with [SMSAero](https://smsaero.ru/api/description/).

## Installation

Just type this:

`npm i smsaero-v2`

## Usage

```typescript
import {Client, Channels, Message} from "smsaero-v2";

// create a client instance with login/key
// and pass a timeout option (optional)
const client = new Client("login", "key", {timeout: 15000});
(async function () {
	const res = await api.send(new Message({
	  channel: Channels.INFO,
	  sign: "SMS Aero",
	  number: "79991112233",
	  text: "Test message"
	}));

	console.log(res)
})();
```

Output format described in Response ([SentResponse.ts](src/Api/Response/SentResponse.ts)).

## Features

Now, you can use two methods: `send` and `getStatus`. If you need more SMSAero API methods tell me what you want.
