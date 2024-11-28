import { Command } from 'commander';
import { connectCommand } from './commands/connect';
import { createCollectionCommand } from './commands/collection';
import { findCollectionCommand } from './commands/collection';
import { deleteCollectionCommand } from './commands/collection';

const program = new Command();

// Set up CLI commands
program
    .name('simpledb-cli')
    .description('CLI to interact with the SimpleDB server')
    .version('1.0.0');

connectCommand(program);
createCollectionCommand(program);
findCollectionCommand(program);
deleteCollectionCommand(program);

program.parse(process.argv);
