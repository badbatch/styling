import { StylingProps } from "@styling/types";
import getCSSVariableProps from "./get-css-variable-props";

describe("getCSSVariableProps", () => {
  const stylingProps = [
    "active",
    "disabled",
    "error",
    ["gender", ["male", "female"]],
    ["maxHeight", "100%"],
    ["maxWidth", "450px"],
    "selected",
    ["status", ["approved", "declined", "pending", "complete"]],
    "success",
  ];

  const props = {
    active: true,
    disabled: false,
    error: undefined,
    gender: "male",
    maxHeight: "100%",
    maxWidth: "450px",
    selected: true,
    status: "blah",
    zIndex: 1,
  };

  it("SHOULD return the correct props", () => {
    expect(getCSSVariableProps(stylingProps as StylingProps, props)).toEqual({
      maxHeight: "100%",
      maxWidth: "450px",
    });
  });
});
