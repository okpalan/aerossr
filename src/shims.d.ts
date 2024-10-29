// src/shims.d.ts

// Declare modules or provide global type definitions here

declare module '@components/server' {
    export function startServer(): void; // Adjust types as per your actual function signature
}

// Declare any additional modules or types you want to shim
declare module 'some-library' {
    // Declare types or exports of some-library
    export function someFunction(arg: string): number;
}

// If you are using any global variables, you can declare them here as well
declare global {
    const myGlobalVariable: string; // Example of a global variable
}

// You can also declare additional interfaces or types if needed
interface MyCustomType {
    id: number;
    name: string;
}
