import { IncomingMessage, ServerResponse } from 'http';
import { readFile } from 'fs/promises';
import { setCorsHeaders, injectMetaTags } from './utils';
import path from 'path';

export async function handleRequest(req: IncomingMessage, res: ServerResponse) {
    const parsedUrl = new URL(req.url || '', `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;

    try {
        if (pathname === '/dist') {
            const projectPath = parsedUrl.searchParams.get('projectPath') || './src';
            const entryPoint = parsedUrl.searchParams.get('entryPoint') || 'main.js';
            const bundle = await generateBundle(projectPath, entryPoint);
            setCorsHeaders(res);
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(bundle);
        } else if (pathname.startsWith('/src/') && pathname.endsWith('.js')) {
            const filePath = path.join(process.cwd(), pathname);
            const fileContent = await readFile(filePath);
            setCorsHeaders(res);
            res.writeHead(200, { 'Content-Type': 'application/javascript' });
            res.end(fileContent);
        } else {
            const htmlPath = path.join(__dirname, '../public/index.html');
            let html = await readFile(htmlPath, 'utf-8');
            const title = 'Your Dynamic Title';
            const description = 'Your dynamic description for SEO';
            html = injectMetaTags(html, title, description);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        }
    } catch (err) {
        console.error(err); // Log the error for debugging

        // Type guard to check if err is an instance of an error with a code property
        if (isErrorWithCode(err)) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        } else {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    }
}

// Type guard function
function isErrorWithCode(err: unknown): err is NodeJS.ErrnoException {
    return typeof err === 'object' && err !== null && 'code' in err;
}

async function generateBundle(projectPath: string, entryPoint: string) {
    const { readFile } = await import('fs/promises');
    const entryFilePath = path.join(projectPath, entryPoint);
    const fileContent = await readFile(entryFilePath, 'utf-8');
    return fileContent;
}
