import * as z from 'zod';

function parseZodSchemaToOption(schema: z.ZodSchema, data: any = {}) {
    const typeName = (schema._def as any).typeName as z.ZodFirstPartyTypeKind;
    switch(typeName) {
        case 'ZodOptional':
        case 'ZodDefault':
            data.optional = true;
            parseZodSchemaToOption((schema as z.ZodDefault<any>)._def.innerType, data)
            break;
        case 'ZodBoolean':
            data.noArg = true;
            break;
        default:
            // console.error(`No handler for ${typeName}`);
    }
    return data;
}

export function schemaToOptions(schema: z.ZodSchema | undefined) {
    if(!schema) {
        return [];
    }
    const typeName = (schema._def as any).typeName as z.ZodFirstPartyTypeKind;
    if(typeName !== 'ZodObject') {
        return [];
    }
    const shape = (schema as z.AnyZodObject)._def.shape();
    // converts a zod schema to option flags
    return Object.entries(shape).map(([key, optionSchema]: any) => {
        const option = parseZodSchemaToOption(optionSchema, {
            longName: key,
            dataName: key,
            key,
        });
        option.flags = [
            option.shortName && `-${option.shortName},`,
            `--${option.longName}`,
            !option.noArg && (option.optional ? `[${option.key}]` : `<${option.key}>`)
        ].join(' ')
        return option;
    });
}

export function addZodMetadata<T extends z.ZodSchema, U extends Object>(schema: T, metadata: U) {
    const customSchema = z.custom<T>((data: any) => {
        return schema.parse(data);
    }) as T & {_meta: U};
    Object.assign(customSchema._meta, metadata);
    return customSchema;
}

// usage: z.object({myFlag: flag()})
export function option<T extends z.ZodSchema>(
    flags: string[],
    description: string,
    schema: T, 
) {
    return addZodMetadata(schema, {flags}).describe(description);
}