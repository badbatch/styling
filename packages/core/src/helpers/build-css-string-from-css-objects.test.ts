import { activeInterpolations, baseInterpolations, props, theme } from "../__tests__/helpers";
import buildCSSStringFromCSSObjects from "./build-css-string-from-css-objects";
import collateCSS from "./collate-css";

describe("buildCSSFromCSSObjects", () => {
  it("SHOULD return the correct css string", () => {
    const selectorCSS = {
      "component-name": {
        css: collateCSS(baseInterpolations, props, theme),
        key: "",
      },
      "component-name--active": {
        css: collateCSS(activeInterpolations, props, theme),
        key: "",
      },
    };

    expect(buildCSSStringFromCSSObjects(selectorCSS)).toMatchSnapshot();
  });
});
