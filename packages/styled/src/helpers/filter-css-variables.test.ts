import { StylingPropsGeneric } from "../types";
import filterCSSVariables from "./filter-css-variables";

describe("filterCSSVariables", () => {
  it("SHOULD return the props that are css variables", () => {
    const props = [
      "active",
      "disabled",
      "error",
      ["maxHeight", "100%"],
      ["maxWidth", "450px"],
      "selected",
      ["status", ["approved", "declined", "pending", "complete"]],
      "success",
    ];

    expect(filterCSSVariables(props as StylingPropsGeneric)).toEqual([
      ["maxHeight", "100%"],
      ["maxWidth", "450px"],
    ]);
  });
});
