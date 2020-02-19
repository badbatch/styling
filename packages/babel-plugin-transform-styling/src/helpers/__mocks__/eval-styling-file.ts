import { MockEvalStylingFile, StylingExports } from "../../types";

const mockModule = jest.genMockFromModule("../eval-styling-file") as MockEvalStylingFile;

let mockFile: StylingExports;
let originalFile: string;

function _getOriginal() {
  return originalFile;
}

function _setMock(file: StylingExports) {
  mockFile = file;
}

function evalStylingFile(file: string) {
  originalFile = file;
  return mockFile;
}

mockModule._getOriginal = _getOriginal;
mockModule._setMock = _setMock;
mockModule.default = evalStylingFile;

module.exports = mockModule;
