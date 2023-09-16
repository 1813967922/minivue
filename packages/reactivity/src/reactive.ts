import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

// 响应式对象枚举状态
export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

// 响应式只读对象
export function readonly(target) {
  return new Proxy(target, readonlyHandlers);
}

// 判断是否是响应式对象
export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}

// 判断是否是只读响应式对象
export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}

// 声明响应式对象
export function reactive(target) {
  return createReactiveObject(target, mutableHandlers);
}

// 创建响应式对象
function createReactiveObject(target, baseHandlers) {
  if (target && typeof target === "object") {
    return new Proxy(target, baseHandlers);
  }
  return target;
}
