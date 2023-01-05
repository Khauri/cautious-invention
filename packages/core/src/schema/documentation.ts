import * as z from 'zod';

export const HeaderBlock = z.object({
    type: z.literal('header'),
    data: z.object({
        text: z.string(),
        level: z.number().min(1).max(6),
    }),
});

export const ParagraphBlock = z.object({
    type: z.literal('paragraph'),
    data: z.object({
        text: z.string(),
    }),
});

export const ImageBlock = z.object({
    type: z.literal('image'),
    data: z.object({
        url: z.string(),
    }),
});

export const DocumentBlock = z.discriminatedUnion('type', [HeaderBlock, ParagraphBlock, ImageBlock]);

export const DocumentationDefinition = z.object({
    time: z.number().default(Date.now()),
    title: z.string().default('Untitled'),
    slug: z.string().default('untitled'),
    blocks: z.array(DocumentBlock).default([]),
});
