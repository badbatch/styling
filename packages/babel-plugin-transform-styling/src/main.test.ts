import { transform } from "@babel/core";
import replaceAppRoot from "./__tests__/helpers/replace-app-root";
import transformStylingFiles from "./main";
import { MockEvalStylingFile } from "./types";

/**
 * TODO: Need to mock out checkAndAwaitActiveBuild
 * and fileChange to stop writing of files into
 * project as part of tests.
 */

jest.mock("@styling/helpers", () => ({
  ...jest.requireActual("@styling/helpers"),
  loadStylingConfig: () => ({ cssOutputPath: "/Users/dylanaubrey/Documents/workspaces/styling/lib/css" }),
}));

jest.mock("./helpers/eval-styling-file");
const evalStylingFile = require("./helpers/eval-styling-file") as MockEvalStylingFile;

describe("transformStylingFiles >>", () => {
  const sourceFile = `
    import { styled } from "@styling/core";
    import BlackText from "./text";
    import { BlueSubtext } from "./subtext";

    export const foo = "bar";

    export const Container = styled(
      "div",
      ["checked", "disabled"],
    )\`
      display: block;
    \`;

    export const Radio = styled(
      "input",
      ["checked", "disabled"],
    )\`
      display: block;
    \`;

    export const Text = styled(
      BlackText,
      ["checked", "disabled"],
    )\`
      display: block;
    \`;

    export const Subtext = styled(
      BlueSubtext,
      ["checked", "disabled"],
    )\`
      display: block;
    \`;
  `;

  beforeEach(() => {
    evalStylingFile._setFile({
      Container: {
        propList: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__container--checked",
          "checked--disabled": "test-component__container--checked--disabled",
          disabled: "test-component__container--disabled",
        },
        relevantPropKeys: ["checked", "disabled"],
      },
      Radio: {
        propList: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__radio--checked",
          "checked--disabled": "test-component__radio--checked--disabled",
          disabled: "test-component__radio--disabled",
        },
        relevantPropKeys: ["checked", "disabled"],
      },
      Subtext: {
        propList: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__subtext--checked",
          "checked--disabled": "test-component__subtext--checked--disabled",
          disabled: "test-component__subtext--disabled",
        },
        relevantPropKeys: ["checked", "disabled"],
      },
      Text: {
        propList: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__text--checked",
          "checked--disabled": "test-component__text--checked--disabled",
          disabled: "test-component__text--disabled",
        },
        relevantPropKeys: ["checked", "disabled"],
      },
    });
  });

  it("SHOULD generate the correct output for the correct files", () => {
    const result = transform(sourceFile, {
      filename: "src/component/index.styling.ts",
      plugins: [
        [
          transformStylingFiles,
          {
            jsOutputPath: {
              path: "./lib/main",
              workingDir: "project",
            },
            logLevel: "error",
          },
        ],
      ],
    });

    if (result) {
      expect(replaceAppRoot(result.code as string)).toMatchSnapshot();
    }
  });
});
