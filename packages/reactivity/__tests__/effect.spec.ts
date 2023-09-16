import { reactive } from "../src/reactive";
import { effect } from "../src/effect";

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
});
