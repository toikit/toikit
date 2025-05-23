
import { setData, getData } from "../data";

export function addAction(name, fn: any) {
  setData('__action_' + name, [fn]);
}

export function doAction(name, data:any = null) {
  let actions = getData('__action_' + name, []);
  let rs = undefined;

  for (let action of actions) {
    let nrs = action(rs, data);
    if (nrs) rs = nrs;
  }

  return rs;
}

export async function doActionWithAsync(name, data:any = null) {
  let actions = getData('__action_' + name, []);
  let rs = undefined;

  for await (let action of actions) {
    let nrs = await action(rs, data);
    if (nrs) rs = nrs;
  }

  return rs;
}