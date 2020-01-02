import { generatePropKeyCombos } from "@styling/helpers";
import { PlainObject, PropListWithoutCSSVariables } from "@styling/types";
import { getInterpolations } from "../__tests__/helpers";
import { MockBuildBaseSelector } from "../types";
import buildCSSObjects from "./build-css-objects";

jest.mock("./build-base-selector");
const buildBaseSelector = require("./build-base-selector") as MockBuildBaseSelector;

describe("buildCSSObjects", () => {
  buildBaseSelector._setSelector("container-eHB-OhMi");

  const propList = [
    "block",
    "disabled",
    "error",
    "externalText",
    "inverse",
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
      "Container",
      {
        outputPath: "",
        selectorPrefix: "button",
        theme: {},
      },
    );

    expect(propNameComboCSS).toMatchSnapshot();
  });
});
