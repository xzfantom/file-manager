import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { stdout } from 'process';
import { getFileName, removeFile, resolvePath } from './fileSystem.js';

export const readFile = async (state, params) => {
  if (params.length !== 1) {
    throw new Error('Invalid input');
  }
  console.log(state, params[0]);
  const fileToRead = resolvePath(state['currentDirectory'], params[0]);
  try {
    const readable = createReadStream(fileToRead);
    readable.pipe(stdout);
    readable.on('end', () => {
      stdout.write(`You are currently in ${state['currentDirectory']}\n`);
    });
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const copyFile = async (state, params) => {
  if (params.length !== 2) {
    throw new Error('Invalid input');
  }

  const [source, destination] = params;
  const sourcePath = resolvePath(state['currentDirectory'], source);
  const fileName = getFileName(sourcePath);
  const destinationPath = resolvePath(state['currentDirectory'], destination, fileName);
  try {
    const input = createReadStream(sourcePath);
    const output = createWriteStream(destinationPath);

    await pipeline(input, output);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const moveFile = async (state, params) => {
  if (params.length !== 2) {
    throw new Error('Invalid input');
  }

  await copyFile(state, params);
  await removeFile(state, [params[0]]);
};
