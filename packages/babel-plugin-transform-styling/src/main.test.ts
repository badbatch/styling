import { transform } from "@babel/core";
import { MockLoadStylingFile } from "./helpers/__mocks__/types";
import transformStylingFiles from "./main";

jest.mock("./helpers/load-styling-file");
const loadStylingFile = require("./helpers/load-styling-file") as MockLoadStylingFile;

describe("transformStylingFiles >>", () => {
  const example = `
    var foo = 1;
    if (foo) console.log(foo);
  `;

  beforeEach(() => {
    loadStylingFile._setFile({
      Container: {
        propsToClassNamesMap: {
          checked: "test-component__container--checked",
          "checked::disabled": "test-component__container--checked--disabled",
          disabled: "test-component__container--disabled",
        },
        tagName: "div",
      },
      Radio: {
        propsToClassNamesMap: {
          checked: "test-component__radio--checked",
          "checked::disabled": "test-component__radio--checked--disabled",
          disabled: "test-component__radio--disabled",
        },
        tagName: "input",
      },
    });
  });

  it("SHOULD generate the correct output for the correct files", () => {
    const result = transform(example, { filename: "index.styling.ts", plugins: [transformStylingFiles] });

    if (result) {
      expect(result.code).toMatchSnapshot();
    }
  });
});
