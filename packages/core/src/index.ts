export * from './schema';
export * from './adapters';
export * from './utils';

export async function initialize({
    dir = process.cwd(),
    storageAdapter,
    documentAdapters = [], // one for each framework you intend to use. e.g. [markoAdapter, svelteAdapter, vueAdapter, jsxAdapter]
} = {}) {
    // load config, initialize adapters
    
}
