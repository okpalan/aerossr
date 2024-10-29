import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import browserSync from 'browser-sync';
import alias from '@rollup/plugin-alias';
import { resolve as pathResolve } from 'path'; // Import path resolve to handle aliases
import polyfillNode from 'rollup-plugin-polyfill-node'; // Import polyfill plugin

// Initialize browser-sync instance
const bs = browserSync.create();

export default {
    // Define multiple entry points
    input: {
        app: 'src/index.ts', // Main application entry
        cli: 'src/cli/cli.ts' // CLI entry
    },
    output: [
        {
            file: 'public/aerossr.iife.js', // Output for IIFE format
            format: 'iife',                  // Immediately Invoked Function Expression for browser
            sourcemap: true,                 // Enable source maps
            globals: {
                http: 'http',
                promises: 'promises',
                path: 'path',
            },
        },
        {
            file: 'public/aerossr.cjs.js', // Output for CommonJS format
            format: 'cjs',                  // CommonJS format
            sourcemap: true,                // Enable source maps
        },
        {
            file: 'public/aerossr.cli.js', // Output for CLI in CommonJS format
            format: 'cjs',                  // CommonJS format
            sourcemap: true,                // Enable source maps
            exports: 'default',              // Specify the exports
        }
    ],
    plugins: [
        polyfillNode(), // Add polyfill for Node.js built-ins
        resolve(), // Resolve node modules
        commonjs(), // Convert CommonJS to ES6
        typescript({ // Use the TypeScript plugin
            tsconfig: './tsconfig.json' // Use the tsconfig file
        }),
        alias({
            entries: [
                { find: '@components', replacement: pathResolve(__dirname, 'src/components') }
            ]
        }),
        {
            name: 'browser-sync',
            buildEnd: () => {
                // Start browser-sync server after build is complete
                bs.init({
                    server: {
                        baseDir: 'public', // Serve files from the 'public' directory
                        index: 'index.html' // Specify the index file
                    },
                    open: true, // Automatically open the browser
                    notify: true // Show notifications for changes
                });
            }
        }
    ],
    watch: {
        clearScreen: false, // Prevent clearing the console on rebuild
        include: 'src/**' // Watch for changes in the src directory
    }
};
