
import { setData, getData } from "../data";

export function addAction(name, fn: any) {
  setData('__action_' + name, [fn]);
}

export function doAction(name, data:any = null) {
  let actions = getData('__action_' + name, []);
  let rs = undefined;
  let max = actions.length - 1;

  for (const [i, action] of actions.entries()) {
    let nrs = action(rs, data, {index: i, end: max == i});
    if (nrs) rs = nrs;
  }

  return rs;
}

export async function doActionAsync(name, data:any = null) {
  let actions = getData('__action_' + name, []);
  let rs = undefined;
  let max = actions.length - 1;

  for await (const [i, action] of actions.entries()) {
    let nrs = await action(rs, data, {index: i, end: max == i});
    if (nrs) rs = nrs;
  }

  return rs;
}