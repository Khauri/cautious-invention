import * as z from 'zod';

export const BlockInputBase = z.object({
    identifier: z.string(),
    label: z.string().optional(),
});

export const BlockInputSlot = BlockInputBase.merge(z.object({
    type: z.literal('slot'),
    placeholderSettings: z.object({
        style: z.string().optional(), // css styles to apply
        visibility: z.enum(['always', 'never', 'drag']).default('drag'), // when to show the placeholder
    }).optional(),
}));

export const BlockInputProp = BlockInputBase.merge(z.object({
    type: z.literal('prop'),
    valueTypes: z.array(z.string()).default([]), // String, Number, Boolean, Object, Array, Function, Symbol, Date, RegExp, Schema, etc.
    defaultValue: z.any().optional(),
}));

export const BlockInput = z.discriminatedUnion('type', [BlockInputSlot, BlockInputProp]);

export const BlockEvent = z.object({
    name: z.string(),
    data: z.array(z.string()).default([]), // A list of data types that the event emits
});

export const BlockDefinition = z.object({
    name: z.string(),
    path: z.string().describe('The path to a .block.json or the entrypoint of the component relative to the project. The exact value here will depend on the framework.'),
    description: z.string().optional().describe('A markdown description of the component'),
    inputs: z.array(BlockInput).default([]).describe('A list of inputs that the component accepts. This includes children/slots.'),
    events: z.array(BlockEvent).default([]).describe('A list of events that the component emits'),
})
    .describe('A block represents a component');