
import { program } from 'commander'; // Example using Commander.js for CLI handling

program
    .version('1.0.0')
    .description('CLI for Aerossr')
    .option('-c, --create <type>', 'Create a new resource of the specified type')
    .action((options) => {
        if (options.create) {
            console.log(`Creating a new resource of type: ${options.create}`);
            // Add your resource creation logic here
        }
    });

program.parse(process.argv); // Parse command line arguments
