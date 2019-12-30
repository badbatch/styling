import { baseInterpolations, props, theme } from "../__tests__/helpers";
import collateCSS from "./collate-css";

describe("collateCSS", () => {
  it("SHOULD return the correct css", () => {
    expect(collateCSS(baseInterpolations, { ...props, active: true }, theme)).toMatchSnapshot();
  });
});
