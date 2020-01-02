import { PropList } from "@styling/types";
import getCSSVariablePropList from "./get-css-variable-prop-list";

describe("getCSSVariablePropList", () => {
  const propList = [
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

  it("SHOULD return the correct prop list", () => {
    expect(getCSSVariablePropList(propList as PropList, props)).toEqual({
      maxHeight: "100%",
      maxWidth: "450px",
    });
  });
});
