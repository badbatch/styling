import { NodePath } from "@babel/core";
import traverse from "@babel/traverse";
import { ExportNamedDeclaration, Identifier, VariableDeclarator, callExpression, stringLiteral } from "@babel/types";
import { info } from "./log";

export default function setIdentifierInExportsArgs(exportDeclarations: Array<NodePath<ExportNamedDeclaration>>) {
  info(`Iterating export declarations`);

  return exportDeclarations.forEach(declaration => {
    info(`Entering export declaration`);

    traverse(
      declaration.node,
      {
        CallExpression(path, state) {
          if (path.findParent(node => node.isTaggedTemplateExpression())) {
            info(`Entering CallExpression`);
            const variable = path.findParent(node => node.isVariableDeclarator()) as NodePath<VariableDeclarator>;
            const name = (variable.get("id") as NodePath<Identifier>).node.name;
            const args = path.get("arguments");
            path.replaceWith(callExpression(path.node.callee, [...args.map(arg => arg.node), stringLiteral(name)]));
            path.skip();
          }
        },
      },
      declaration.scope,
      declaration,
    );
  });
}
