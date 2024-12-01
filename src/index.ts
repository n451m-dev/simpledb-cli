import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'calculator> ',
});

const performOperation = (input: string): string => {
    const [command, ...args] = input.split(' ');

    try {
        switch (command) {
            case 'add': {
                const [num1, num2] = args.map(Number);
                return `Result: ${num1 + num2}`;
            }
            case 'subtract': {
                const [num1, num2] = args.map(Number);
                return `Result: ${num1 - num2}`;
            }
            case 'multiply': {
                const [num1, num2] = args.map(Number);
                return `Result: ${num1 * num2}`;
            }
            case 'divide': {
                const [num1, num2] = args.map(Number);
                if (num2 === 0) {
                    return 'Error: Division by zero is not allowed.';
                }
                return `Result: ${num1 / num2}`;
            }
            case 'exit':
                rl.close();
                return 'Goodbye!';
            default:
                return `Unknown command: ${command}. Available commands are: add, subtract, multiply, divide, exit.`;
        }
    } catch (err) {
        return `Error processing command: ${err.message}`;
    }
};

// Start the REPL
rl.prompt();
rl.on('line', (line: string) => {
    const input = line.trim();
    if (input) {
        const output = performOperation(input);
        console.log(output);
    }
    rl.prompt();
});

rl.on('close', () => {
    console.log('Calculator exited.');
    process.exit(0);
});
