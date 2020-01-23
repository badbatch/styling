import { mount } from "enzyme";
import React from "react";
import styling from "./main";

describe("styling", () => {
  const PrimaryButton = styling(
    "button",
    [
      "block",
      "inverse",
      "disabled",
      "error",
      "externalText",
      "noText",
      ["size", ["xs", "sm", "md"]],
      "stretch",
      ["variant", ["primary", "secondary", "link"]],
    ],
    [
      "block",
      "disabled",
      "error",
      "externalText",
      "inverse",
      "noText",
      "stretch",
      "variant::link",
      "size::xs",
      "size::sm",
    ],
    {
      base: "button__primary-button-1842608486",
      block: "button__primary-button-1842608486--block",
      disabled: "button__primary-button-1842608486--disabled",
      error: "button__primary-button-1842608486--error",
      "external-text": "button__primary-button-1842608486--external-text",
      inverse: "button__primary-button-1842608486--inverse",
      "no-text": "button__primary-button-1842608486--no-text",
      "no-text--size-sm": "button__primary-button-1842608486--no-text--size-sm",
      "no-text--size-xs": "button__primary-button-1842608486--no-text--size-xs",
      stretch: "button__primary-button-1842608486--stretch",
      "variant-link": "button__primary-button-1842608486--variant-link",
    },
  );

  describe("WHEN a tag name is passed in as the component", () => {
    it("SHOULD return the correct component with the correct class names", () => {
      expect(mount(<PrimaryButton noText size="sm" />).html()).toMatchSnapshot();
    });
  });

  describe("WHEN a React component is passed in as the component", () => {
    const PrimaryButtonStyledSpan = styling(
      PrimaryButton,
      [
        "block",
        "inverse",
        "disabled",
        "error",
        "externalText",
        "noText",
        ["size", ["xs", "sm", "md"]],
        "stretch",
        ["variant", ["primary", "secondary", "link"]],
      ],
      [],
      {
        base: "button__primary-button-styled-span-759899086",
      },
    );

    it("SHOULD return the correct component with the correct class names", () => {
      expect(mount(<PrimaryButtonStyledSpan noText size="sm" />).html()).toMatchSnapshot();
    });
  });
});
