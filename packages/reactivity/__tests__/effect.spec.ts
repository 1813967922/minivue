import { reactive } from "../src/reactive";
import { effect } from "../src/effect";

describe("effect", () => {
    
  test("Object", () => {
    const original = { foo: 1 }
    const observed = reactive(original)
    let dummy;
    effect(()=>{
        dummy = observed.foo + 1
    })
    expect(dummy).toBe(2)
    // update
    observed.foo++
    expect(dummy).toBe(3)
});

});
