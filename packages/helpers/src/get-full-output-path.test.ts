import getFullOutputPath from "./get-full-output-path";

describe("getFullOutputPath", () => {
  it("SHOUD return the correct path when a file is passed in", () => {
    const outputPath = "/user/root/packages/button/lib/css";
    const sourceFilename = "/user/root/packages/button/src/component/styled/index.styling.js";

    expect(getFullOutputPath(outputPath, sourceFilename, { exclude: "src", extension: ".css" })).toBe(
      "/user/root/packages/button/lib/css/component/styled/index.styling.css",
    );
  });

  it("SHOUD return the correct path when a folder is passed in", () => {
    const outputPath = "/user/root/packages/button/lib/css";
    const sourceFilename = "/user/root/packages/button/src/component/styled";

    expect(getFullOutputPath(outputPath, sourceFilename, { exclude: "src" })).toBe(
      "/user/root/packages/button/lib/css/component/styled",
    );
  });
});
