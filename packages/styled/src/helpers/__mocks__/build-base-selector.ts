import { MockBuildBaseSelector } from "../../types";

const mockModule = jest.genMockFromModule("../build-base-selector") as MockBuildBaseSelector;

let mockSelector: string;

function _setSelector(selector: string) {
  mockSelector = selector;
}

function buildBaseSelector(componentName: string, prefix?: string) {
  return mockSelector;
}

mockModule._setSelector = _setSelector;
mockModule.default = buildBaseSelector;

module.exports = mockModule;
