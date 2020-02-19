import { ImportDeclaration, importDeclaration, stringLiteral } from "@babel/types";
import { getFullOutputPath, getPathFromConfig } from "@styling/helpers";
import { PathConfig } from "@styling/types";
import appRoot from "app-root-path";
import { parse, relative } from "path";
import { CSS_FILE_EXT } from "../constants";

export default function addCSSFileToImportDeclarations(
  importDeclarationsToInclude: ImportDeclaration[],
  sourceFilename: string,
  cssOutputPath: string,
  jsOutputPath: string | PathConfig,
) {
  const { dir } = parse(sourceFilename);

  const fullJSFolderOutputPath = getFullOutputPath(
    getPathFromConfig(jsOutputPath, appRoot.toString(), dir, process.cwd()),
    dir,
    { exclude: "src" },
  );

  const fullCSSOutputPath = getFullOutputPath(cssOutputPath, sourceFilename, {
    exclude: "src",
    extension: CSS_FILE_EXT,
  });

  importDeclarationsToInclude.push(
    importDeclaration([], stringLiteral(relative(fullJSFolderOutputPath, fullCSSOutputPath))),
  );
}
