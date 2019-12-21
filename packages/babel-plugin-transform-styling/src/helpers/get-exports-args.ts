import { NodePath } from "@babel/core";
import traverse from "@babel/traverse";
import { ExportNamedDeclaration, Identifier, VariableDeclarator } from "@babel/types";
import { IDENTIFIER, STRING_LITERAL } from "../constants";
import { ExportsArgsResult } from "../types";

export default function getExportsArgs(exportDeclarations: Array<NodePath<ExportNamedDeclaration>>) {
  return exportDeclarations.reduce(
    (args: ExportsArgsResult, declaration) => {
      traverse(
        declaration.node,
        {
          CallExpression(path, state) {
            if (path.findParent(node => node.isTaggedTemplateExpression())) {
              const variable = path.findParent(node => node.isVariableDeclarator()) as NodePath<VariableDeclarator>;
              const name = (variable.get("id") as NodePath<Identifier>).node.name;
              const firstArg = path.get("arguments")[0];
              const obj = { type: "", value: "" };

              if (firstArg.isIdentifier()) {
                obj.type = IDENTIFIER;
                obj.value = firstArg.node.name;
                args.identifiers.push(obj.value);
              } else if (firstArg.isStringLiteral()) {
                obj.type = STRING_LITERAL;
                obj.value = firstArg.node.value;
              }

              args.map.set(name, obj);
            }
          },
        },
        declaration.scope,
        declaration,
      );

      return args;
    },
    { identifiers: [], map: new Map() },
  );
}
