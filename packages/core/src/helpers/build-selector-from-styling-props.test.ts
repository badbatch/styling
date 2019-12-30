import buildSelectorFromStylingProps from "./build-selector-from-styling-props";

describe("buildSelectorFromStylingProps", () => {
  it("SHOULD return the correct selector", () => {
    const propNameCombos = ["active", "disabled", "status::approved"];

    expect(buildSelectorFromStylingProps("component-name", propNameCombos)).toBe(
      "component-name--active--disabled--status-approved",
    );
  });
});
