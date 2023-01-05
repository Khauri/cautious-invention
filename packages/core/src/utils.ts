import * as path from 'path';
import * as fs from 'fs/promises';
import { existsSync } from 'fs';
import { Jsonifiable } from 'type-fest';
import * as z from 'zod';

class Result<DataType = unknown, ErrorType = unknown> {
    constructor(public data: DataType, public error: ErrorType) {}

    unwrap(): DataType {
        if(this.error) {
            throw this.error;
        }
        return this.data;
    }

    static Ok<DataType, ErrorType>(data: DataType): Result<DataType, ErrorType> {
        return new Result(data, null);
    }

    static Err<DataType, ErrorType>(error: ErrorType): Result<DataType, ErrorType> {
        return new Result(null, error);
    }

    static from<DataType>(promiseOrFn: Promise<DataType> | (() => Promise<DataType>)) : Promise<Result<DataType, unknown>> {
        if(typeof promiseOrFn === 'function') {
            try {
                return Result.from(promiseOrFn());
            } catch(error) {
                return Promise.resolve(Result.Err(error));
            }
        }
        return promiseOrFn
            .then(data => Result.Ok(data))
            .catch(error => Result.Err(error));
    }

}

export function readJsonFile<T extends Jsonifiable>(filePath: string): Promise<Result<T, unknown>> {
    return Result.from(async () => {
        const file = await fs.readFile(filePath);
        return JSON.parse(file.toString());
    });
}

export function writeJsonFile(filePath: string, data: Jsonifiable) {
    return Result.from(async () => {
        await fs.writeFile(filePath, JSON.stringify(data, null, 4));
        return true;
    });
}; 

/**
 * Get the project root directory by searching for the closest package.json
 * given a starting directory.
 * @param cwd The starting directory
 */
export function getProjectRoot(cwd = process.cwd()) {
    const root = path.resolve(cwd, 'package.json');
    if(existsSync(root)) {
        return Result.Ok(cwd);
    }
    if(cwd === '/') {
        return Result.Err('Could not find project root');
    }
    return getProjectRoot(path.resolve(cwd, '..'));
}

/**
 * Gets a path to the .chronicle directory
 */
export function getChronicleRootDir() {
    return Result.from(async () => {
        const root = getProjectRoot().unwrap();
        const chronicleDir = path.resolve(root, '.chronicle');
        if(!existsSync(chronicleDir)) {
            throw new Error('Could not find .chronicle directory');
        }
        return chronicleDir;
    });
}

export function getChronicleConfig() {
    return Result.from(async () => {
        const chronicleDir = (await getChronicleRootDir()).unwrap();
        const configPath = path.resolve(chronicleDir, 'config.json');
        const config = (await readJsonFile(configPath)).unwrap();
        return config;
    });
}
