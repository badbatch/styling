import { PropList } from "@styling/types";
import filterRelevantPropList from "./filter-relevant-prop-list";

describe("filterRelevantPropList", () => {
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

  const relevantPropKeys = ["active", "gender::male", "selected"];

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

  it("SHOULD return the relevant prop list", () => {
    expect(filterRelevantPropList(propList as PropList, relevantPropKeys, props)).toEqual([
      "active",
      ["gender", ["male"]],
      "selected",
    ]);
  });
});
