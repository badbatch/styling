import { MockEvalStylingFile, StylingExports } from "../../types";

const mockModule = jest.genMockFromModule("../eval-styling-file") as MockEvalStylingFile;

let mockFile: StylingExports;

function _setFile(file: StylingExports) {
  mockFile = file;
}

function evalStylingFile(filename: string) {
  return mockFile;
}

mockModule._setFile = _setFile;
mockModule.default = evalStylingFile;

module.exports = mockModule;
