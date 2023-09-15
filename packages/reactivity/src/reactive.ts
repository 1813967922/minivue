import { track,trigger } from "./effect";

/**
 * 响应式副作用实现
 * @param target 
 * @returns 
 */
export function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      // 依赖收集
      track(target, key);
      return res;
    },
    set(target, key, value, receiver) {
      const res = Reflect.set(target, key, value, receiver);
      // 触发依赖
      trigger(target,key)
      return res;
    }
  });
}
