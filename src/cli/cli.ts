import { program } from 'commander';
import { createResource } from './create'; 
import { deleteResource } from './delete';

program
    .version('1.0.0')
    .description('AeroSSR Command Line Interface');

// Create command
program
    .command('create <type>')
    .description('Create a new resource of the specified type')
    .option('-n, --name <name>', 'Name of the resource')
    .action((type, options) => {
        if (!options.name) {
            console.error('Error: --name option is required when creating a resource.');
            process.exit(1);
        }
        createResource(type, options.name); // Call your create function
    });

// Delete command
program
    .command('delete <type>')
    .description('Delete a specified resource')
    .action((type) => {
        deleteResource(type); // Call your delete function
    });

// List command (example)
program
    .command('list')
    .description('List all resources')
    .action(() => {
        console.log('Listing all resources...');
        // Add logic to list resources
    });

// Parse command-line arguments
program.parse(process.argv);
