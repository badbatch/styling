import evalStylingFile from "./eval-styling-file";

describe("evalStylingFile", () => {
  it("SHOULD eval the file correctly", () => {
    const sourceFile = `
      export const Container = {
        props: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__container--checked",
          "checked::disabled": "test-component__container--checked--disabled",
          disabled: "test-component__container--disabled",
        },
      };

      export const Radio = {
        props: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__radio--checked",
          "checked::disabled": "test-component__radio--checked--disabled",
          disabled: "test-component__radio--disabled",
        },
      };

      export const Subtext = {
        props: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__subtext--checked",
          "checked::disabled": "test-component__subtext--checked--disabled",
          disabled: "test-component__subtext--disabled",
        },
      };

      export const Text = {
        props: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__text--checked",
          "checked::disabled": "test-component__text--checked--disabled",
          disabled: "test-component__text--disabled",
        },
      };
    `;

    const output = evalStylingFile(sourceFile, "index.js");

    expect(output).toEqual({
      Container: {
        props: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__container--checked",
          "checked::disabled": "test-component__container--checked--disabled",
          disabled: "test-component__container--disabled",
        },
      },
      Radio: {
        props: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__radio--checked",
          "checked::disabled": "test-component__radio--checked--disabled",
          disabled: "test-component__radio--disabled",
        },
      },
      Subtext: {
        props: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__subtext--checked",
          "checked::disabled": "test-component__subtext--checked--disabled",
          disabled: "test-component__subtext--disabled",
        },
      },
      Text: {
        props: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__text--checked",
          "checked::disabled": "test-component__text--checked--disabled",
          disabled: "test-component__text--disabled",
        },
      },
    });
  });
});
