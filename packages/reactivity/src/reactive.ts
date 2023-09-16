import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

export function readonly(target) {
  return new Proxy(target, readonlyHandlers);
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
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
