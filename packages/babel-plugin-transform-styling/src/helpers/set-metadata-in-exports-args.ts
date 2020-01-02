import { NodePath } from "@babel/core";
import traverse from "@babel/traverse";
import { ExportNamedDeclaration, Identifier, VariableDeclarator, callExpression, stringLiteral } from "@babel/types";
import { info } from "./log";

export default function setMetadataInExportsArgs(
  exportDeclarations: Array<NodePath<ExportNamedDeclaration>>,
  sourceDir: string,
) {
  info(`Iterating export declarations`);

  return exportDeclarations.forEach(declaration => {
    info(`Entering export declaration`);

    traverse(
      declaration.node,
      {
        CallExpression(path, state) {
          if (path.findParent(node => node.isTaggedTemplateExpression())) {
            info(`Entering call expression`);
            info(`Find parent`);
            const variable = path.findParent(node => node.isVariableDeclarator()) as NodePath<VariableDeclarator>;
            info(`Get id`);
            const name = (variable.get("id") as NodePath<Identifier>).node.name;
            info(`Get arguments`);
            const args = path.get("arguments");
            info(`Replace call expression`);
            path.replaceWith(
              callExpression(path.node.callee, [
                ...args.map(arg => arg.node),
                stringLiteral(name),
                stringLiteral(sourceDir),
              ]),
            );
            path.skip();
          }
        },
      },
      declaration.scope,
      declaration,
    );
  });
}
