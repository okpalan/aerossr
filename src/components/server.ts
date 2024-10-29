import http from 'http';
import { handleRequest } from './routes';

export function startServer(port: number) {
    const server = http.createServer(handleRequest);
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
