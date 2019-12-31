import { StylingCSSVariables } from "../types";
import buildCSSPropsFromStylingProps from "./build-css-props-from-styling-props";

describe("buildCSSPropsFromStylingProps", () => {
  it("SHOULD return the correct object properties and values", () => {
    const propNameCombos = ["active", "disabled", "error", "selected", "success", "status::approved"];

    const cssVariableProps: StylingCSSVariables = [
      ["maxHeight", "100%"],
      ["maxWidth", "450px"],
    ];

    expect(buildCSSPropsFromStylingProps(propNameCombos, cssVariableProps)).toMatchSnapshot();
  });
});
