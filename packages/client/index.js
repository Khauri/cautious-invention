// This is handwritten for now, but in the future will be a typescript
// file that gets generated and placed in the dist folder
// This is the entry-point for the server 
import express from 'express';
import {handler} from './build/handler.js';

export function start({port = 5050} = {}) {
    return new Promise((res) => {
        const app = express();
        
        app.use(handler);
        
        app.listen(port, () => res({port}));
    });
}
