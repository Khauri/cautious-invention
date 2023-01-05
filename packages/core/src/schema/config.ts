import * as z from 'zod';

export const ChronicleConfig = z.object({
    root: z.string().optional().describe('The root directory of the project. Defaults to the closest parent directory containing a package.json file.'),
});
