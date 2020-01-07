import filterValidDOMAttributes from "./filter-valid-dom-attributes";

describe("filterValidDOMAttributes", () => {
  const props = {
    "aria-label": "This is an aria label",
    "data-attribute": "This is a data attribute",
    onClick: "This is an event handler",
    tabindex: 1,
    variant: "This should be filtered out",
  };

  describe("WHEN the component is a tag name", () => {
    it("SHOULD return the correct props", () => {
      expect(filterValidDOMAttributes("div", props)).toEqual({
        "aria-label": "This is an aria label",
        "data-attribute": "This is a data attribute",
        onClick: "This is an event handler",
        tabIndex: 1,
      });
    });
  });

  describe("WHEN the component is a React component", () => {
    it("SHOULD return the correct props", () => {
      expect(filterValidDOMAttributes(() => null, props)).toBe(props);
    });
  });
});
