import { resolve } from "path";
import checkFileAndImports from "./check-file-and-imports";

describe("checkFileAndImports", () => {
  it("SHOULD return true if the file or any of its imported files has changed", () => {
    const mockFilePath = resolve(__dirname, "../__tests__/mock-file.txt");
    const hasChanged = checkFileAndImports(mockFilePath, { lastCheckedFiles: { [mockFilePath]: Date.now() } });
    expect(hasChanged).toBe(true);
  });
});
