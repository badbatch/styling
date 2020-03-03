import { NodePath } from "@babel/core";
import { CallExpression, ExportNamedDeclaration, Identifier, VariableDeclaration } from "@babel/types";
import { IDENTIFIER, STRING_LITERAL, STYLED_FUNC_NAME } from "../constants";
import { ExportsArgsResult } from "../types";

export default function getExportsComponentArgs(exportDeclarations: NodePath<ExportNamedDeclaration>[]) {
  return exportDeclarations.reduce(
    (args: ExportsArgsResult, declaration) => {
      const variableDeclaratorPath = (declaration.get("declaration") as NodePath<VariableDeclaration>).get(
        "declarations",
      )[0];

      const name = (variableDeclaratorPath.get("id") as NodePath<Identifier>).node.name;
      const initPath = variableDeclaratorPath.get("init");

      if (!initPath.isTaggedTemplateExpression()) return args;

      const callExpressionPath = initPath.get("tag") as NodePath<CallExpression>;
      const callee = callExpressionPath.get("callee");
      if (!callee.isIdentifier() || callee.node.name !== STYLED_FUNC_NAME) return args;

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
