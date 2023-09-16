import { mutableHandlers, readonlyHandlers } from "./baseHandlers";
import { track, trigger } from "./effect";

export function readonly(target) {
  return new Proxy(target, readonlyHandlers);
}

/**
 * 响应式副作用实现
 * @param target
 * @returns
 */
export function reactive(target) {
  return createReactiveObject(target, mutableHandlers);
}

function createReactiveObject(target, baseHandlers) {
  if (target && typeof target === "object") {
    return new Proxy(target, baseHandlers);
  }
  return target;
}
