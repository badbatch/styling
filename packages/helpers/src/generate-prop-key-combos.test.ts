import { PropListWithoutCSSVariables } from "@styling/types";
import { isEqual } from "lodash";
import generatePropKeyCombos from "./generate-prop-key-combos";

describe("generatePropKeyCombos", () => {
  let combos: string[][];

  beforeEach(() => {
    const props = [
      "active",
      "disabled",
      "error",
      "selected",
      ["status", ["approved", "declined", "pending", "complete"]],
      "success",
    ];

    combos = generatePropKeyCombos(props as PropListWithoutCSSVariables);
  });

  it("SHOULD return the correct combinations for a given set of prop keys", () => {
    expect(combos).toMatchSnapshot();
  });

  it("SHOULD return a set of unique combinations", () => {
    expect(
      combos.filter(combo => {
        const match = combos.filter(c => isEqual(combo, c));
        return match.length > 1;
      }).length,
    ).toBe(0);
  });
});
