import { NodePath } from "@babel/core";
import {
  ExportNamedDeclaration,
  Identifier,
  VariableDeclarator,
  arrayExpression,
  callExpression,
  stringLiteral,
} from "@babel/types";
import { info } from "@styling/helpers";
import { STYLED_FUNC_NAME } from "../constants";

export default function setMetadataInExportsArgs(
  exportDeclarations: NodePath<ExportNamedDeclaration>[],
  filename: string,
) {
  info("Iterating export declarations");

  return exportDeclarations.forEach(declaration => {
    info("Entering export declaration");

    declaration.traverse({
      CallExpression: path => {
        if ((path.get("callee") as NodePath<Identifier>).node.name === STYLED_FUNC_NAME) {
          info("Entering call expression");
          info("Find parent");
          const variable = path.findParent(node => node.isVariableDeclarator()) as NodePath<VariableDeclarator>;
          info("Get id");
          const name = (variable.get("id") as NodePath<Identifier>).node.name;
          info("Get arguments");
          const argsPath = path.get("arguments");
          info("Replace call expression");

          const argNodes = argsPath.slice(0, 2).map(argPath => argPath.node);

          if (argNodes.length === 1) {
            argNodes.push(arrayExpression());
          }

          path.replaceWith(
            callExpression(path.node.callee, [...argNodes, stringLiteral(name), stringLiteral(filename)]),
          );

          path.skip();
        }
      },
    });
  });
}
