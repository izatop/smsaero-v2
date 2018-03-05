type TestCase = () => any;

export async function test(name: string, fn: TestCase) {
    try {
        process.stdout.write(`run ${name}..`);
        await fn();
        process.stdout.write(". done\n");
    } catch (error) {
        console.log(name, "fail");
        console.log(error.stack);
    }
}