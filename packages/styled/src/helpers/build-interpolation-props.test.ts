import { CSSVariablePropList } from "@styling/types";
import buildInterpolationProps from "./build-interpolation-props";

describe("buildInterpolationProps", () => {
  it("SHOULD return the correct object properties and values", () => {
    const propKeyCombo = ["active", "disabled", "error", "selected", "success", "status::approved"];

    const cssVariablePropList: CSSVariablePropList = [
      ["maxHeight", "100%"],
      ["maxWidth", "450px"],
    ];

    expect(buildInterpolationProps(propKeyCombo, cssVariablePropList)).toMatchSnapshot();
  });
});
