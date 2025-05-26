import {setData, getData} from '../data';

export const setRoot = (dir?: string) => {
  setData('__root_path__', dir, false);
}

export const rootPath = (ls?: string) => {
  if(!ls) return getData('__root_path__');
  return getData('__root_path__') + '/' + ls;
};

export const appPath = (ls?: string) => {
  if (!ls) return rootPath('app');
  return rootPath('app/' + ls);
};
