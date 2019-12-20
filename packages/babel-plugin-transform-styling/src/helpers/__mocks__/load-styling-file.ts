import { StylingNamedExports } from "../../types";
import { MockLoadStylingFile } from "./types";

const mockModule = jest.genMockFromModule("../build-transformed-file") as MockLoadStylingFile;

let mockFile: StylingNamedExports;

function _setFile(file: StylingNamedExports) {
  mockFile = file;
}

function loadStylingFile(filename: string) {
  return mockFile;
}

mockModule._setFile = _setFile;
mockModule.default = loadStylingFile;

module.exports = mockModule;
