import { StylingProps } from "@styling/types";
import filterRelevantProps from "./filter-relevant-props";

describe("filterRelevantProps", () => {
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

  it("SHOULD return the relevant props", () => {
    expect(filterRelevantProps(stylingProps as StylingProps, props)).toEqual({
      active: true,
      gender: "male",
      selected: true,
    });
  });
});
