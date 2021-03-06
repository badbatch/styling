import { MockBuildTransformedFile, StylingExports } from "../../types";

const mockModule = jest.genMockFromModule("../build-transformed-file") as MockBuildTransformedFile;

let mockFile: string;

function _setFile(file: string) {
  mockFile = file;
}

function buildTransformedFile(_namedExports: StylingExports) {
  return mockFile;
}

mockModule._setFile = _setFile;
mockModule.default = buildTransformedFile;

module.exports = mockModule;
