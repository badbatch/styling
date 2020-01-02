import { PropList } from "@styling/types";
import filterOutCSSVariables from "./filter-out-css-variables";

describe("filterOutCSSVariables", () => {
  it("SHOULD return the props that are css variables", () => {
    const propList = [
      "active",
      "disabled",
      "error",
      ["maxHeight", "100%"],
      ["maxWidth", "450px"],
      "selected",
      ["status", ["approved", "declined", "pending", "complete"]],
      "success",
    ];

    expect(filterOutCSSVariables(propList as PropList)).toEqual([
      "active",
      "disabled",
      "error",
      "selected",
      ["status", ["approved", "declined", "pending", "complete"]],
      "success",
    ]);
  });
});
