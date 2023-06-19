import process from 'process';
import os from 'os';

import { parseArgs } from './utils.js';

const args = parseArgs(process.argv.slice(2));

const state = {
  username: args['--username'],
  currentDirectory: os.homedir(),
};

console.log(`Welcome to the File Manager, ${state['username']}!`);

process.on('exit', (code) => {
  console.log(`Thank you for using File Manager, ${state['username']}, goodbye!`);
  process.exit();
});

process.on('SIGINT', (code) => {
  console.log(`Thank you for using File Manager, ${state['username']}, goodbye!`);
  process.exit();
});

while (true) {
  console.log(`You are currently in ${state['currentDirectory']}`);
  const input = process.stdin.read();
  //process.exit();
}
