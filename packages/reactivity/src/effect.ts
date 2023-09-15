
const targetMap = new WeakMap();

let activeEffect;

/**
 * 响应式副作用实现
 */
export class ReactiveEffect {
  private _fn: any;

  constructor(fn) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    this._fn();
  }
}


/**
 * 依赖收集
 * @param target 
 * @param key 
 */
export function track(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }
  dep.add(activeEffect);
}

/**
 * 副作用函数
 * @param fn 
 */
// TODO 实现 effect 返回 runner
export function effect(fn) {
  const _effect = new ReactiveEffect(fn);
  _effect.run();
}

/**
 * 触发依赖
 * @param target 
 * @param key 
 */
export function trigger(target, key) {
  let depsMap = targetMap.get(target);
  let dep = depsMap.get(key);
  for (const effect of dep) {
    effect.run();
  }
}
