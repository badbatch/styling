import getFullOutputPath from "./get-full-output-path";

describe("getFullOutputPath", () => {
  it("SHOUD return the correct path", () => {
    const outputPath = "/user/root/packages/button/lib/css";
    const sourceFilename = "/user/root/packages/button/src/component/styled/index.js";

    expect(getFullOutputPath(outputPath, sourceFilename)).toBe(
      "/user/root/packages/button/lib/css/component/styled/index.styling.css",
    );
  });
});
