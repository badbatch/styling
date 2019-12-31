import buildMapKeyFromProps from "./build-map-key-from-props";

describe("buildMapKeyFromProps", () => {
  it("SHOULD return the correct map key", () => {
    const props = {
      active: true,
      gender: "male",
      selected: true,
    };

    expect(buildMapKeyFromProps(props)).toBe("active--gender-male--selected");
  });
});
