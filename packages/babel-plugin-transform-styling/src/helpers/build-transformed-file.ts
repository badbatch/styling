import template from "@babel/template";
import { ImportDeclaration, Statement, identifier, stringLiteral } from "@babel/types";
import {
  COMPONENT_EXPORT,
  FILE_COMMENT_AND_IMPORT,
  IDENTIFIER,
  PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER,
} from "../constants";
import { ExportsArgsMap, StylingNamedExports } from "../types";

export default function buildTransformedFile(
  namedExports: StylingNamedExports,
  importDeclarationsToInclude: ImportDeclaration[],
  exportsArgsMap: ExportsArgsMap,
) {
  return Object.keys(namedExports).reduce(
    (file, name) => {
      const { propsToClassNamesMap } = namedExports[name];
      const { type, value } = exportsArgsMap.get(name) as { type: string; value: string };

      const buildAST = template(
        COMPONENT_EXPORT.replace(PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER, JSON.stringify(propsToClassNamesMap)),
      );

      const ast = buildAST({
        COMPONENT: type === IDENTIFIER ? identifier(value) : stringLiteral(value),
        EXPORT_NAME: identifier(name),
      });

      file.push(ast as Statement);
      return file;
    },
    [template.ast(FILE_COMMENT_AND_IMPORT), ...importDeclarationsToInclude] as Statement[],
  );
}
