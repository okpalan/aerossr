
# AeroSSR

AeroSSR is a lightweight, customizable server-side rendering (SSR) solution that supports JavaScript bundling, caching, error handling, and meta tag injection. It provides an intuitive API for building, caching, and serving JavaScript bundles with support for CORS, compression, and custom routes.

## Features
- **JavaScript Bundling**: Bundle JavaScript dependencies dynamically from project paths and entry points.
- **Caching**: Cache bundles and templates with cache management support.
- **Meta Tag Injection**: Easily customize meta tags, including `title`, `description`, and `viewport`.
- **ETag and CORS Support**: Handle conditional requests using ETags and manage CORS policies.
- **Middleware Support**: Add custom middleware functions to modify request and response handling.
- **Error Handling**: Generate custom error pages for improved user experience.

## Installation

Clone the repository and install dependencies:
```bash
git clone https://github.com/okpalan/aerossr.git
cd aerossr
npm install
```

## Usage

### 1. Basic Setup

Create a new `AeroSSR` instance with the desired configuration and start the server:
```javascript
const AeroSSR = require('./path/to/AeroSSR');

const server = new AeroSSR({
  port: 3000,               // Port to run the server on (default: 3000)
  cacheMaxAge: 3600,        // Cache expiration time in seconds
  corsOrigins: '*',         // Allowed CORS origins
  compression: true         // Enable/disable compression
});

server.start().then(() => {
  console.log('Server started on port 3000');
});
```

### 2. Defining Routes

Define custom routes and route handlers:
```javascript
server.route('/api/data', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Hello from AeroSSR!' }));
});
```

### 3. Middleware

Add middleware functions to process requests before they reach route handlers:
```javascript
server.use(async (req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
});
```

### 4. Bundle JavaScript Files

Generate and serve JavaScript bundles from a specified project path and entry point:
```javascript
const projectPath = './src';
const entryPoint = 'main.js';

const bundle = await server.generateBundle(projectPath, entryPoint);
console.log('Bundle created:', bundle);
```

Access the bundle via a GET request:
```plaintext
http://localhost:3000/dist?projectPath=./src&entryPoint=main.js
```

### 5. Handling Errors

Customize error handling by defining the error response and page templates:
```javascript
server.handleError = async (error, req, res) => {
  console.error('Custom error:', error);
  const errorPage = await server.generateErrorPage(500, 'An error occurred.');
  res.writeHead(500, { 'Content-Type': 'text/html' });
  res.end(errorPage);
};
```

### 6. CORS Configuration

Set up CORS headers to control access for different origins:
```javascript
server.config.corsOrigins = 'https://yourdomain.com';
```

### 7. Injecting Meta Tags

Customize meta tags for each page:
```javascript
const customMeta = {
  title: 'My AeroSSR App',
  description: 'Description of my AeroSSR application'
};

server.route('/', async (req, res) => {
  const html = await fs.readFile('./index.html', 'utf-8');
  const htmlWithMeta = server.injectMetaTags(html, customMeta);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlWithMeta);
});
```

### 8. Cache Management

Clear the cache when needed:
```javascript
server.clearCache();
```

## API Reference

### `new AeroSSR(config)`

Creates a new instance of `AeroSSR`.

**Parameters**
- `config.port` (number): Port to listen on (default: 3000).
- `config.cacheMaxAge` (number): Max cache age in seconds (default: 3600).
- `config.corsOrigins` (string): Allowed CORS origins (default: `*`).
- `config.compression` (boolean): Enable or disable compression (default: true).

### `.use(middleware)`

Add a middleware function.

### `.route(path, handler)`

Define a route with a specific handler function.

### `.generateBundle(projectPath, entryPoint, force)`

Generate a JavaScript bundle from a specified project path and entry point.

**Parameters**
- `projectPath` (string): Path to the project folder.
- `entryPoint` (string): Main JavaScript file to bundle.
- `force` (boolean): Force regeneration of the bundle.

### `.start()`

Start the AeroSSR server.

### `.stop()`

Stop the AeroSSR server.

## License

This project is licensed under the MIT License.
