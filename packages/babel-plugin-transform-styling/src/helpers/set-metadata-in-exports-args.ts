import { NodePath } from "@babel/core";
import {
  CallExpression,
  ExportNamedDeclaration,
  Identifier,
  TaggedTemplateExpression,
  VariableDeclaration,
  callExpression,
  stringLiteral,
} from "@babel/types";
import { info } from "@styling/helpers";

export default function setMetadataInExportsArgs(
  exportDeclarations: Array<NodePath<ExportNamedDeclaration>>,
  sourceDir: string,
) {
  info(`Iterating export declarations`);

  return exportDeclarations.forEach(declaration => {
    info(`Entering export declaration`);

    const variableDeclaratorPath = (declaration.get("declaration") as NodePath<VariableDeclaration>).get(
      "declarations",
    )[0];

    const name = (variableDeclaratorPath.get("id") as NodePath<Identifier>).node.name;

    const callExpressionPath = (variableDeclaratorPath.get("init") as NodePath<TaggedTemplateExpression>).get(
      "tag",
    ) as NodePath<CallExpression>;

    const argumentsPath = callExpressionPath.get("arguments");

    callExpressionPath.replaceWith(
      callExpression(callExpressionPath.node.callee, [
        ...argumentsPath.map(argumentPath => argumentPath.node),
        stringLiteral(name),
        stringLiteral(sourceDir),
      ]),
    );
  });
}
