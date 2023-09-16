import { reactive } from "../src/reactive";
import { effect,stop } from "../src/effect";

describe("effect", () => {
  test("effect test", () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    let dummy;
    effect(() => {
      dummy = observed.foo + 1;
    });
    expect(dummy).toBe(2);
    // update
    observed.foo++;
    expect(dummy).toBe(3);
  });

  test("runner", () => {
    let dummy = 10;
    let runner = effect(() => {
      dummy++;
      return "foo";
    });
    expect(dummy).toBe(11);
    const r = runner();
    expect(dummy).toBe(12);
    expect(r).toBe("foo");
  });

  test("scheduler", () => {
    let dummy;
    let run;
    const scheduler = vitest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    let runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);
    run();
    expect(dummy).toBe(2);
  });

  test("stop", () => {
    let dummy;
    const obj = reactive({ prop: 1 });
    const runner = effect(() => {
      dummy = obj.prop;
    });
    obj.prop = 2;
    expect(dummy).toBe(2);
    stop(runner);
    obj.prop = 3;
    expect(dummy).toBe(2);
    runner();
    expect(dummy).toBe(3);
  });

  test("onStop", () => {
    const obj = reactive({ prop: 1 });
    const onStop = vitest.fn();
    let dummy;
    const runner = effect(() => {
      dummy = obj.prop;
    },{
      onStop
    });
    stop(runner);
    expect(onStop).toBeCalledTimes(1);
  });
});
