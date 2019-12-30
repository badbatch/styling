import { transform } from "@babel/core";
import { MockEvalStylingFile } from "./helpers/__mocks__/types";
import transformStylingFiles from "./main";

jest.mock("./helpers/eval-styling-file");
const evalStylingFile = require("./helpers/eval-styling-file") as MockEvalStylingFile;

describe("transformStylingFiles >>", () => {
  const sourceFile = `
    import { styled } from "@styling/core";
    import BlackText from "./text";
    import { BlueSubtext, RedSubtext } from "./subtext";

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
        propsToClassNamesMap: {
          checked: "test-component__container--checked",
          "checked::disabled": "test-component__container--checked--disabled",
          disabled: "test-component__container--disabled",
        },
      },
      Radio: {
        propsToClassNamesMap: {
          checked: "test-component__radio--checked",
          "checked::disabled": "test-component__radio--checked--disabled",
          disabled: "test-component__radio--disabled",
        },
      },
      Subtext: {
        propsToClassNamesMap: {
          checked: "test-component__subtext--checked",
          "checked::disabled": "test-component__subtext--checked--disabled",
          disabled: "test-component__subtext--disabled",
        },
      },
      Text: {
        propsToClassNamesMap: {
          checked: "test-component__text--checked",
          "checked::disabled": "test-component__text--checked--disabled",
          disabled: "test-component__text--disabled",
        },
      },
    });
  });

  it("SHOULD generate the correct output for the correct files", () => {
    const result = transform(sourceFile, { filename: "index.styling.ts", plugins: [transformStylingFiles] });

    if (result) {
      expect(result.code).toMatchSnapshot();
    }
  });
});
