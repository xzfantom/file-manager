import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { resolvePath } from './fileSystem.js';

export const compress = async (state, arg) => {
  if (arg.length !== 2) {
    throw new Error('Invalid input');
  }

  const inputPath = resolvePath(state['currentDirectory'], arg[0]);
  const outputPath = resolvePath(state['currentDirectory'], arg[1]);

  const comp = createBrotliCompress();
  const input = createReadStream(inputPath);
  const output = createWriteStream(outputPath);

  try {
    await pipeline(input, comp, output);
  } catch (error) {
    throw new Error('Operation failed');
  }
};

export const decompress = async (state, arg) => {
  if (arg.length !== 2) {
    throw new Error('Invalid input');
  }

  const inputPath = resolvePath(state['currentDirectory'], arg[0]);
  const outputPath = resolvePath(state['currentDirectory'], arg[1]);

  const decomp = createBrotliDecompress();
  const input = createReadStream(inputPath);
  const output = createWriteStream(outputPath);

  try {
    await pipeline(input, decomp, output);
  } catch (error) {
    throw new Error('Operation failed');
  }
};
