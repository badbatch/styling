import buildSelectorFromPropKeyCombo from "./build-selector-from-prop-key-combo";

describe("buildSelectorFromPropKeyCombo", () => {
  it("SHOULD return the correct selector", () => {
    const propKeyCombo = ["active", "disabled", "status::approved"];

    expect(buildSelectorFromPropKeyCombo("component-name", propKeyCombo)).toBe(
      "component-name--active--disabled--status-approved",
    );
  });
});
