import { createHash } from 'crypto';
import { readFile } from 'fs/promises';
import { resolvePath } from './fileSystem';

export const calculateHash = async (state, args) => {
  if (args.length !== 1) {
    throw new Error('Invalid input');
  }

  const filePath = resolvePath(state['currentDirectory'], args[0]);

  const hash = createHash('sha256');
  hash.on('readable', () => {
    const data = hash.read();
    if (data) {
      console.log(data.toString('hex'));
    }
  });

  const stream = await readFile(filePath);
  hash.write(stream);
  hash.end();
};
