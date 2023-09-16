import { readonly } from "../src/reactive";

describe("readonly", () => {
  test("happy path", () => {
    const original = { foo: 1 }
    const wrapped = readonly(original)
    expect(wrapped).not.toBe(original)
    expect(wrapped.foo).toBe(1)
  });

  test("warn then call set", () => {
    console.warn = vitest.fn()
    const wrapped = readonly({ foo: 1 })
    wrapped.foo = 2
    expect(console.warn).toBeCalled()
  });

});
