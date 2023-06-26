import process from 'process';
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

import { userName, homeDir, parseOsCommand } from './os.js';
import { changeDirectory, listDirectory, createFile, renameFile, removeFile } from './fileSystem.js';
import { readFile, copyFile, moveFile } from './streams.js';
import { calculateHash } from './hash.js';
import { compress, decompress } from './compress.js';
import { parseArgs, parseString } from './utils.js';

const rl = readline.createInterface({ input: stdin, output: stdout });

const args = parseArgs(process.argv.slice(2));

const state = {
  username: args['--username'] || userName,
  currentDirectory: homeDir,
};

console.log(`Welcome to the File Manager, ${state['username']}!`);

process.on('exit', (code) => {
  console.log(`Thank you for using File Manager, ${state['username']}, goodbye!`);
});

process.on('SIGINT', (code) => {
  console.log(`Thank you for using File Manager, ${state['username']}, goodbye!`);
  process.exit();
});

while (true) {
  const answer = await rl.question(`You are currently in ${state['currentDirectory']}\n`);
  const [command, ...arg] = parseString(answer);
  try {
    switch (command) {
      case '.exit':
        process.exit();
      case 'up':
        await changeDirectory(state, ['..'].concat(arg));
        break;
      case 'cd':
        await changeDirectory(state, arg);
        break;
      case 'ls':
        await listDirectory(state, arg);
        break;
      case 'cat':
        await readFile(state, arg);
        break;
      case 'add':
        await createFile(state, arg);
        break;
      case 'rn':
        await renameFile(state, arg);
        break;
      case 'cp':
        await copyFile(state, arg);
        break;
      case 'mv':
        await moveFile(state, arg);
        break;
      case 'rm':
        await removeFile(state, arg);
        break;
      case 'os':
        parseOsCommand(arg);
        break;
      case 'hash':
        await calculateHash(state, arg);
        break;
      case 'compress':
        await compress(state, arg);
        break;
      case 'decompress':
        await decompress(state, arg);
        break;
      default:
        throw new Error(`Invalid input`);
    }
  } catch (e) {
    console.log(e.message);
  }
}
