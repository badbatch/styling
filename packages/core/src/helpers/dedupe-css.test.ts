import { activeInterpolations, baseInterpolations, props, theme } from "../__tests__/helpers";
import collateCSS from "./collate-css";
import dedupeCSS from "./dedupe-css";

describe("dedupeCSS", () => {
  it("SHOULD return the correct css", () => {
    const activeCSS = collateCSS(activeInterpolations, props, theme);
    const baseCSS = collateCSS(baseInterpolations, props, theme);
    expect(dedupeCSS(activeCSS, baseCSS)).toMatchSnapshot();
  });
});
