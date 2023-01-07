import React, {useEffect, useState} from 'react';
import {Text} from 'ink';
import * as z from 'zod';
import * as chronicleClient from '@chronicle/client';

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
    const [client, setClient] = useState({isStarted: false, port: null});
    useEffect(async () => {
        if(!opts.serverOnly) {
            const {port} = await chronicleClient.start({port: opts.clientPort});
            setClient({
                isStarted: true,
                port
            });
        }
    }, []);
    return (
        <>
            {
                client.isStarted 
                    ? <Text>Client running on {client.port} </Text>
                    : <Text>Starting client... </Text>
            }
        </>
    );
}