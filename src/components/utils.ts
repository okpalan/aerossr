import { ServerResponse } from 'http';

export function setCorsHeaders(res: ServerResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export function injectMetaTags(html: string, title: string, description: string) {
    const safeTitle = title || 'Your Default Title'; // Fallback title
    const safeDescription = description || 'Your default description.'; // Fallback description

    html = html.replace('<title>Your Default Title</title>', `<title>${safeTitle}</title>`);
    html = html.replace('<meta name="description" content="Your default description.">', `<meta name="description" content="${safeDescription}">`);
    return html;
}

export class LRUCache {
    private capacity: number;
    private map: Map<string, any>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
    }

    get(key: string): any {
        if (!this.map.has(key)) return null;
        const value = this.map.get(key);
        // Move the accessed item to the end to signify recent use
        this.map.delete(key);
        this.map.set(key, value);
        return value;
    }

    put(key: string, value: any): void {
        if (this.map.has(key)) {
            this.map.delete(key);
        } else if (this.map.size === this.capacity) {
            // Evict the least recently used item (the first item in Map)
            const leastRecentlyUsedKey = this.map.keys().next().value; // Get the first key
            if (leastRecentlyUsedKey !== undefined) { // Check if it's defined
                this.map.delete(leastRecentlyUsedKey); // Delete the least recently used key
            }
        }
        this.map.set(key, value);
    }
}

export class MRUCache {
    private capacity: number;
    private map: Map<string, any>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
    }

    get(key: string): any {
        if (!this.map.has(key)) return null;
        return this.map.get(key);
    }

    put(key: string, value: any): void {
        if (this.map.has(key)) {
            this.map.delete(key);
        } else if (this.map.size === this.capacity) {
            // Evict the most recently used item (the last item in Map)
            const mostRecentlyUsedKey = Array.from(this.map.keys()).pop(); // Get the last key
            if (mostRecentlyUsedKey !== undefined) { // Check if it's defined
                this.map.delete(mostRecentlyUsedKey); // Delete the most recently used key
            }
        }
        this.map.set(key, value);
    }
}
