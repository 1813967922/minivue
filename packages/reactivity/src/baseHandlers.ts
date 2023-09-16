import { track, trigger } from "./effect";
import { ReactiveFlags } from "./reactive";

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

// 创建get函数
function createGetter(isReadonly = false) {
  return function get(target, key) {
    // 判断是不是响应式对象
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    }
    // 判断是不是只读响应式对象
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }
    const res = Reflect.get(target, key);
    // 如果不是只读响应式对象才对依赖进行收集
    if (!isReadonly) {
      // 依赖收集
      track(target, key);
    }
    return res;
  };
}

// 创建set函数
function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);
    // 触发依赖
    trigger(target, key);
    return res;
  };
}

// 普通响应式对象get、set函数
export const mutableHandlers = {
  get,
  set,
};

// 只读响应式对象get函数，调用set会报错
export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key, value, receiver) {
    console.warn(`set on key ${key} falied，target: ${target} is readonly`);
    return true;
  },
};
