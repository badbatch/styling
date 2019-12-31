import { isEqual } from "lodash";
import { StylingPropsWithoutCSSVariables } from "../types";
import generatePropNameCombos from "./generate-prop-name-combos";

describe("generatePropNameCombos", () => {
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

    combos = generatePropNameCombos(props as StylingPropsWithoutCSSVariables);
  });

  it("SHOULD return the correct combinations for a given set of prop names", () => {
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
