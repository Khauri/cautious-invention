import React from 'react';
import {Text} from 'ink';
import * as z from 'zod';

const {
    CHRONICLE_PORT_SERVER = 5050,
    CHRONICLE_PORT_CLIENT = 5051
} = process.env;

export const props = z.object({
    clientPort: z.coerce.number().default(Number(CHRONICLE_PORT_SERVER)),
    serverPort: z.coerce.number().default(Number(CHRONICLE_PORT_CLIENT)),
    serverOnly: z.boolean().default(false),
    clientOnly: z.boolean().default(false)
});

export type ServeOptions = z.infer<typeof props>;

export default function serve(opts: ServeOptions) {
    console.log(opts);
    return <Text>Serve not yet implemented</Text>
}