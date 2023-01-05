// Any storage adapter must implement this interface
import * as z from 'zod';
import { DocumentationDefinition, BlockDefinition } from '../schema';

export interface StorageAdapter {
    init(): Promise<void>;
    // blocks
    createBlock(block: z.infer<typeof BlockDefinition>): Promise<boolean>;
    getBlock(id: string): Promise<z.infer<typeof BlockDefinition>>;
    updateBlock(id: string, block: z.infer<typeof BlockDefinition>): Promise<boolean>;
    deleteBlock(id: string): Promise<boolean>;
    // components
    createComponent(component: z.infer<typeof BlockDefinition>): Promise<boolean>;
    getComponent(id: string): Promise<z.infer<typeof BlockDefinition>>;
    updateComponent(id: string, component: z.infer<typeof BlockDefinition>): Promise<boolean>;
    deleteComponent(id: string): Promise<boolean>;
    // documentation
    createDocumentation(id: string, documentation: z.infer<typeof DocumentationDefinition>): Promise<boolean>;
    getDocumentation(id: string): Promise<z.infer<typeof DocumentationDefinition>>;
    updateDocumentation(id: string, documentation: z.infer<typeof DocumentationDefinition>): Promise<boolean>;
    deleteDocumentation(id: string): Promise<boolean>;
    // TODO: bindings, configs, other stuff
}