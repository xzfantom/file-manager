import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

export const compress = async (state, arg) => {
  if (arg.length !== 2) {
    throw new Error('Invalid input');
  }

  const inputPath = resolvePath(state['currentDirectory'], arg[0]);
  const outputPath = resolvePath(state['currentDirectory'], arg[1]);

  const comp = createBrotliCompress();
  const input = createReadStream(inputPath);
  const output = createWriteStream(outputPath);

  pipeline(input, comp, output, (err) => {
    if (err) {
      throw err;
    }
  });
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

  pipeline(input, decomp, output, (err) => {
    if (err) {
      throw err;
    }
  });
};
