import { NodePath } from "@babel/core";
import {
  CallExpression,
  ExportNamedDeclaration,
  Identifier,
  TaggedTemplateExpression,
  VariableDeclaration,
} from "@babel/types";
import { IDENTIFIER, STRING_LITERAL } from "../constants";
import { ExportsArgsResult } from "../types";

export default function getExportsComponentArgs(exportDeclarations: Array<NodePath<ExportNamedDeclaration>>) {
  return exportDeclarations.reduce(
    (args: ExportsArgsResult, declaration) => {
      const variableDeclaratorPath = (declaration.get("declaration") as NodePath<VariableDeclaration>).get(
        "declarations",
      )[0];

      const name = (variableDeclaratorPath.get("id") as NodePath<Identifier>).node.name;

      /**
       * TODO: Defensively code against other variables being
       * exported from the file.
       */

      const callExpressionPath = (variableDeclaratorPath.get("init") as NodePath<TaggedTemplateExpression>).get(
        "tag",
      ) as NodePath<CallExpression>;

      const firstArgumentsPath = callExpressionPath.get("arguments")[0];
      const obj = { type: "", value: "" };

      if (firstArgumentsPath.isIdentifier()) {
        obj.type = IDENTIFIER;
        obj.value = firstArgumentsPath.node.name;
        args.identifiers.push(obj.value);
      } else if (firstArgumentsPath.isStringLiteral()) {
        obj.type = STRING_LITERAL;
        obj.value = firstArgumentsPath.node.value;
      }

      args.map.set(name, obj);
      return args;
    },
    { identifiers: [], map: new Map() },
  );
}
