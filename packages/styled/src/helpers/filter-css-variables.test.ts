import { PropList } from "@styling/types";
import filterCSSVariables from "./filter-css-variables";

describe("filterCSSVariables", () => {
  it("SHOULD return the props that are css variables", () => {
    const propList = [
      "active",
      "disabled",
      "error",
      ["height"],
      ["maxHeight", "100%"],
      ["maxWidth", "450px"],
      "selected",
      ["status", ["approved", "declined", "pending", "complete"]],
      "success",
    ];

    expect(filterCSSVariables(propList as PropList)).toEqual([
      ["height"],
      ["maxHeight", "100%"],
      ["maxWidth", "450px"],
    ]);
  });
});
