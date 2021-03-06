import {MessageArguments} from "./Api/MessageArguments";
import {Validator} from "./Api/Validator";

export class Message {
    constructor(private message: MessageArguments) {
        Validator.validate(message);
    }

    serialize(): MessageArguments {
        const {number, ...message} = this.message;
        let rest: { number: string } | { numbers: string[] };

        if (Array.isArray(number)) {
            rest = {numbers: number};
        } else {
            rest = {number};
        }

        return {
            ...rest,
            ...message
        } as MessageArguments;
    }
}
