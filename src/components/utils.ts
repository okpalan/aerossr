import { ServerResponse } from 'http';

export function setCorsHeaders(res: ServerResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export function injectMetaTags(html: string, title: string, description: string) {
    html = html.replace('<title>Your Default Title</title>', `<title>${title}</title>`);
    html = html.replace('<meta name="description" content="Your default description.">', `<meta name="description" content="${description}">`);
    return html;
}
