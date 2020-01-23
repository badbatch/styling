import { generatePropKeyCombos } from "@styling/helpers";
import { PlainObject, PropList, PropListWithoutCSSVariables } from "@styling/types";
import { getInterpolations } from "../__tests__/helpers";
import buildCSSObjects from "./build-css-objects";

describe("buildCSSObjects", () => {
  const propList: PropList = [
    "block",
    "inverse",
    "disabled",
    "error",
    "externalText",
    "noText",
    ["size", ["xs", "sm", "md"]],
    "stretch",
    ["variant", ["primary", "secondary", "link"]],
  ];

  const baseInterpolations = getInterpolations`
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    outline: none;
    position: relative;
  `;

  const displayInterpolations = getInterpolations`
    align-items: center;
    display: table-cell;
    display: flex;
    justify-content: center;
    text-align: center;
    vertical-align: middle;
`;

  function getBorderRadius({ noText, variant }: PlainObject) {
    if (variant === "link") return "0";
    return noText ? "50%" : "24px";
  }

  function getInnerContainerJustifyContent({ stretch }: PlainObject) {
    return stretch && "justify-content: space-between;";
  }

  const interpolations = getInterpolations`
    ${baseInterpolations};
    border-radius: ${getBorderRadius};
    height: 100%;
    white-space: nowrap;
    width: 100%;
    ${displayInterpolations};
    ${getInnerContainerJustifyContent};
  `;

  it("SHOULD return the correct selector css objects", () => {
    const propNameComboCSS = buildCSSObjects(
      generatePropKeyCombos(propList as PropListWithoutCSSVariables),
      [],
      interpolations,
      { componentName: "Container", propList, sourceFilename: "path/to/component/index.ts" },
      {
        outputPath: "",
        selectorPrefix: "button",
        theme: {},
      },
    );

    expect(propNameComboCSS).toMatchSnapshot();
  });
});
