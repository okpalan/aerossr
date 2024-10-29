import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import browserSync from 'browser-sync';

// Initialize browser-sync instance
const bs = browserSync.create();

export default {
  input: 'src/index.ts',  // Entry point
  output: {
    file: 'public/aerossr.js',  // Output bundled file
    format: 'iife',              // Immediately Invoked Function Expression for browser
    sourcemap: true              // Enable source maps
  },
  plugins: [
    resolve(),                   // Resolve node modules
    commonjs(),                 // Convert CommonJS to ES6
    typescript({                // Use the TypeScript plugin
      tsconfig: './tsconfig.json' // Use the tsconfig file
    }),
    {
      name: 'browser-sync',
      buildEnd: () => {
        // Start browser-sync server after build is complete
        createServer({
          server: {
            baseDir: 'public',     // Serve files from the 'public' directory
            index: 'index.html'    // Specify the index file
          },
          open: true,              // Automatically open the browser
          notify: true             // Show notifications for changes
        });
      }
    }
  ],
  watch: {
    clearScreen: false,        // Prevent clearing the console on rebuild
    include: 'src/**'          // Watch for changes in the src directory
  }
};
