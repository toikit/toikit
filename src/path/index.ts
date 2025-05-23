import path from 'path';
import {setData, getData} from '../data';

export const setRoot = (dir?: string) => {
  setData('__root_path__', dir, false);
}

export const rootPath = (ls?: string) => {
  let dir = getData('__root_path__');
  let root = path.resolve(dir, '../..');

  if (ls) return path.join(root, ls);
  return root;
};

export const appPath = (ls?: string) => {
  if (!ls) return rootPath('app');
  return rootPath('app/' + ls);
};
