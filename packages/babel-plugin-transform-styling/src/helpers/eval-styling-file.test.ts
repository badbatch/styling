import evalStylingFile from "./eval-styling-file";

describe("evalStylingFile", () => {
  it("SHOULD eval the file correctly", () => {
    const sourceFile = `
      export const Container = {
        propList: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__container--checked",
          "checked--disabled": "test-component__container--checked--disabled",
          disabled: "test-component__container--disabled",
        },
        relevantPropKeys: ["checked", "disabled"],
      };

      export const Radio = {
        propList: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__radio--checked",
          "checked--disabled": "test-component__radio--checked--disabled",
          disabled: "test-component__radio--disabled",
        },
        relevantPropKeys: ["checked", "disabled"],
      };

      export const Subtext = {
        propList: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__subtext--checked",
          "checked--disabled": "test-component__subtext--checked--disabled",
          disabled: "test-component__subtext--disabled",
        },
        relevantPropKeys: ["checked", "disabled"],
      };

      export const Text = {
        propList: ["checked", "disabled"],
        propsToClassNamesMap: {
          checked: "test-component__text--checked",
          "checked--disabled": "test-component__text--checked--disabled",
          disabled: "test-component__text--disabled",
        },
        relevantPropKeys: ["checked", "disabled"],
      };
    `;

    const output = evalStylingFile(sourceFile, `${__dirname}/index.js`, false);

    expect(output).toEqual({
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
});
