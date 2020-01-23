import { PropList } from "@styling/types";
import buildSelectorFromPropKeyCombo from "./build-selector-from-prop-key-combo";

describe("buildSelectorFromPropKeyCombo", () => {
  it("SHOULD return the correct selector", () => {
    const propKeyCombo = ["active", "disabled", "status::approved"];
    const propList: PropList = ["disabled", "active", ["status", ["approved", "rejected"]]];

    expect(buildSelectorFromPropKeyCombo("component-name", propKeyCombo, propList)).toBe(
      "component-name--disabled--active--status-approved",
    );
  });
});
