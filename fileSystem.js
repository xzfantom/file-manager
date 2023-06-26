import { readdir, rename, writeFile, stat, unlink } from 'fs/promises';
import { resolve, parse } from 'path';

export const resolvePath = (...args) => {
  return resolve(...args);
};

export const getFileName = (path) => {
  return parse(path).base;
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
    throw new Error('Operation failed');
  }

  state['currentDirectory'] = newPath;
};

export const listDirectory = async (state, params) => {
  if (params.length !== 0) {
    throw new Error('Invalid input');
  }

  const directory = state['currentDirectory'];
  try {
    const files = await readdir(directory, { withFileTypes: true });
    const result = files.map((file) => {
      if (file.isDirectory()) {
        return { name: file.name, type: 'directory' };
      }
      return { name: file.name, type: 'file' };
    });
    console.table(result);
  } catch (error) {
    throw new Error('Operation failed');
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
    throw new Error('Operation failed');
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
    throw new Error('Operation failed');
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
    throw new Error('Operation failed');
  }
};
