import { mount } from "enzyme";
import React from "react";
import styling from "./main";

describe("styling", () => {
  it("SHOULD return the correct component with the correct class names", () => {
    const Container = styling("div", ["checked", "disabled"], ["checked", "disabled"], {
      base: "container",
      checked: "container--checked",
      "checked--disabled": "container--checked--disabled",
      disabled: "container--disabled",
    });

    expect(mount(<Container checked disabled />).html()).toBe(
      `<div disabled="\" class="container container--checked--disabled container--checked container--disabled"></div>`,
    );
  });
});
