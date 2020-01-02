import { MockEvalStylingFile, StylingNamedExports } from "../../types";

const mockModule = jest.genMockFromModule("../eval-styling-file") as MockEvalStylingFile;

let mockFile: StylingNamedExports;

function _setFile(file: StylingNamedExports) {
  mockFile = file;
}

function evalStylingFile(filename: string) {
  return mockFile;
}

mockModule._setFile = _setFile;
mockModule.default = evalStylingFile;

module.exports = mockModule;
