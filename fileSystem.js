import { readdir, rename, writeFile, stat, unlink } from 'fs/promises';
import { resolve } from 'path';

export const resolvePath = (state, path) => {
  return resolve(state['currentDirectory'], path);
};

export const changeDirectory = async (state, params) => {
  if (params.length !== 1) {
    throw new Error('Invalid input');
  }

  const directory = params[0];
  const newPath = resolvePath(state['currentDirectory'], directory);

  try {
    const stats = await stat(newPath);
    if (!stats.isDirectory()) {
      throw new Error('Invalid input');
    }
  } catch (error) {
    throw new Error('Invalid input');
  }

  state['currentDirectory'] = newPath;
};

export const listDirectory = async (state, params) => {
  if (params.length !== 0) {
    throw new Error('Invalid input');
  }

  const directory = state['currentDirectory'];
  try {
    const files = await readdir(directory);

    console.table(files);
  } catch (error) {
    throw new Error('Invalid input');
  }
};

export const createFile = async (state, params) => {
  if (params.length !== 1) {
    throw new Error('Invalid input');
  }

  const file = params[0];
  const filePath = resolvePath(state['currentDirectory'], file);
  try {
    await writeFile(filePath, '');
  } catch (error) {
    throw new Error('Invalid input');
  }
};

export const renameFile = async (state, params) => {
  if (params.length !== 2) {
    throw new Error('Invalid input');
  }

  const [oldName, newName] = params;
  const oldPath = resolvePath(state['currentDirectory'], oldName);
  const newPath = resolvePath(state['currentDirectory'], newName);
  try {
    await rename(oldPath, newPath);
  } catch (error) {
    throw new Error('Invalid input');
  }
};

export const removeFile = async (state, params) => {
  if (params.length !== 1) {
    throw new Error('Invalid input');
  }

  const file = params[0];
  const filePath = resolvePath(state['currentDirectory'], file);
  try {
    await unlink(filePath);
  } catch (error) {
    throw new Error('Invalid input');
  }
};
