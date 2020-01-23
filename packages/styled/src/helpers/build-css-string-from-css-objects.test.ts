import { activeInterpolations, baseInterpolations, props, theme } from "../__tests__/helpers";
import { PropKeyComboCSS } from "../types";
import buildCSSStringFromCSSObjects from "./build-css-string-from-css-objects";
import collateCSS from "./collate-css";

describe("buildCSSFromCSSObjects", () => {
  it("SHOULD return the correct css string", () => {
    const propKeyComboCSS: PropKeyComboCSS = [
      [
        "active",
        {
          css: collateCSS(activeInterpolations, props, theme),
          keyCombo: ["active"],
          selector: "component-name--active",
        },
      ],
      [
        "base",
        {
          css: collateCSS(baseInterpolations, props, theme),
          keyCombo: [],
          selector: "component-name",
        },
      ],
    ];

    expect(buildCSSStringFromCSSObjects(propKeyComboCSS)).toMatchSnapshot();
  });
});
