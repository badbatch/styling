import template from "@babel/template";
import { ImportDeclaration, Statement, identifier, stringLiteral } from "@babel/types";
import { error, verbose } from "@styling/helpers";
import {
  COMPONENT_EXPORT,
  FILE_COMMENT_AND_IMPORT,
  IDENTIFIER,
  PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER,
  PROP_LIST_PLACEHOLDER,
  RELEVANT_PROP_KEYS_PLACEHOLDER,
} from "../constants";
import { ExportsArgsMap, StylingExports } from "../types";

export default function buildTransformedFile(
  namedExports: StylingExports,
  importDeclarationsToInclude: ImportDeclaration[],
  exportsArgsMap: ExportsArgsMap,
) {
  let errors = 0;

  const output = Object.keys(namedExports).reduce(
    (file, name) => {
      const { propList, propsToClassNamesMap, relevantPropKeys } = namedExports[name];
      const exportArgs = exportsArgsMap.get(name);

      if (!exportArgs) {
        error(`buildTransformedFile expected ${name} to be an export arg, but it was undefined`);
        errors += 1;
        return file;
      }

      const { type, value } = exportArgs;

      const buildAST = template(
        COMPONENT_EXPORT.replace(PROP_LIST_PLACEHOLDER, JSON.stringify(propList))
          .replace(RELEVANT_PROP_KEYS_PLACEHOLDER, JSON.stringify(relevantPropKeys))
          .replace(PROPS_TO_CLASSNAMES_MAP_PLACEHOLDER, JSON.stringify(propsToClassNamesMap)),
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

  if (errors) {
    verbose("buildTransformedFile encountered a problem transforming exports", output);
  }

  return output;
}
