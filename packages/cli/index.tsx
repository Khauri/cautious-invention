import * as z from 'zod';
import React from 'react';
import {program, Command} from 'commander';
import {render} from 'ink';
import * as commands from './commands';
import {schemaToOptions} from './utils';

type ChronicleCommand = {
    default: Function,
    props: z.ZodSchema
}

for(const cmdName in commands) {
    const config = commands[cmdName];
    const command = new Command(cmdName);
    const options = schemaToOptions(config.props);
    for(const opt of options) {
        command.option(opt.flags)
    }
    command.action((flags) => {
        // console.log(flags);
        const parseResult = (config.props as z.ZodSchema).safeParse(flags);
        if(!parseResult.success) {
            console.error('An issue occured parsing the props');
            console.error(parseResult.error.toString());
            return;
        }
        render(<config.default {...parseResult.data} />)
    });
    program.addCommand(command);
}

program.parse();
