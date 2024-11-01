import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import browserSync from 'browser-sync';
import alias from '@rollup/plugin-alias';
import { resolve as pathResolve } from 'path';
import polyfillNode from 'rollup-plugin-polyfill-node';

const bs = browserSync.create();

export default {
    // Define multiple entry points
    input: {
        app: 'src/index.ts',
        cli: 'src/cli/cli.ts'
    },
    output: [
        {
            dir: 'public', // Output directory for code-splitting
            format: 'cjs', // Use CommonJS format for code-splitting
            sourcemap: true,
            entryFileNames: '[name].js', // Named outputs
            chunkFileNames: '[name]-[hash].js', // Use a hash for chunk file names
            globals: {
                http: 'http',
                promises: 'promises',
                path: 'path',
            },
        },
        {
            file: 'public/aerossr.cli.js', // CLI specific output
            format: 'cjs', // CommonJS format
            sourcemap: true,
            exports: 'default', // Specify the exports
        }
    ],
    plugins: [
        polyfillNode(),
        resolve(),
        commonjs(),
        typescript({
            tsconfig: './tsconfig.json',
            clean: true,
        }),
        alias({
            entries: [
                { find: '@components', replacement: pathResolve(__dirname, 'src/components') }
            ]
        }),
        {
            name: 'browser-sync',
            buildEnd: () => {
                bs.init({
                    server: {
                        baseDir: 'public',
                        index: 'index.html'
                    },
                    open: true,
                    notify: true
                });
            }
        }
    ],
    watch: {
        clearScreen: false,
        include: 'src/**'
    }
};
