// src/cli.ts
import { program } from 'commander';
import { createResource } from './create';
// import { deleteResource } from './delete';

program
    .version('1.0.0')
    .description('AeroSSR Command Line Interface')
    .option('-c, --create <type>', 'Create a new resource of the specified type')
    .option('-n, --name <name>', 'Name of the resource')
    .action((options) => {
        if (options.create) {
            if (!options.name) {
                console.error('Error: --name option is required when creating a resource.');
                process.exit(1);
            }
            // Call the createResource function with the provided options
            createResource(options.create, options.name);
        } else {
            console.error('Error: --create option is required.');
            process.exit(1);
        }
    });

program
    .command('delete <type>')
    .description('Delete a specified resource')
    .action((type) => {
        console.log(`Deleting resource of type: ${type}`);
        // Add your resource deletion logic here
    });

program.parse(process.argv); // Parse command line arguments.
