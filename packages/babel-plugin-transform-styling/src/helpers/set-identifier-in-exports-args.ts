import { NodePath } from "@babel/core";
import traverse from "@babel/traverse";
import { ExportNamedDeclaration, Identifier, VariableDeclarator, callExpression, stringLiteral } from "@babel/types";

export default function setIdentifierInExportsArgs(exportDeclarations: Array<NodePath<ExportNamedDeclaration>>) {
  return exportDeclarations.forEach(declaration => {
    traverse(
      declaration.node,
      {
        CallExpression(path, state) {
          if (path.findParent(node => node.isTaggedTemplateExpression())) {
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
