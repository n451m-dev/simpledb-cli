import * as readline from 'readline';
import { Command } from 'commander';
import { connectCommand } from './commands/connect';
import { createCollectionCommand } from './commands/collection';
import { findCollectionCommand } from './commands/collection';
import { deleteCollectionCommand } from './commands/collection';

const program = new Command();

program
    .name('simpledb-cli')
    .description('CLI to interact with the SimpleDB server')
    .version('1.0.0');

connectCommand(program);
createCollectionCommand(program);
findCollectionCommand(program);
deleteCollectionCommand(program);

// Add interactive mode using readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close();
        process.exit(0);
    }
    // You can parse commands here and execute
    program.parse([process.argv[0], process.argv[1], input]);
});

program.parse(process.argv);
