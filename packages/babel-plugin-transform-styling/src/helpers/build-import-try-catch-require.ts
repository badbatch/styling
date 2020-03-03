import { NodePath } from "@babel/core";
import template from "@babel/template";
import { ImportDeclaration, isImportDefaultSpecifier, isImportNamespaceSpecifier } from "@babel/types";

export default function buildImportTryCatchRequire(declarationPath: NodePath<ImportDeclaration>, index: number) {
  const sourceValue = declarationPath.get("source").node.value;
  const specifierPaths = declarationPath.get("specifiers");
  const variableDeclarations: string[] = [];
  const variableAssignments: [string, string][] = [];
  let isNamespaced = false;

  specifierPaths.forEach(specifierPath => {
    const specifierName = specifierPath.get("local").node.name;

    if (isImportDefaultSpecifier(specifierPath)) {
      variableDeclarations.push(specifierName);
      variableAssignments.push([specifierName, "default"]);
    } else if (isImportNamespaceSpecifier(specifierPath)) {
      variableDeclarations.push(specifierName);
      isNamespaced = true;
    } else {
      variableDeclarations.push(specifierName);
      variableAssignments.push([specifierName, specifierName]);
    }
  });

  return template.ast`
    ${variableDeclarations.map(name => `let ${name}`).join("\n")}

    try {
      ${
        isNamespaced
          ? buildNamespacedRequire(variableDeclarations, sourceValue)
          : buildRequireWithVariableAssignments(variableAssignments, sourceValue, index)
      }
    } catch {}
  `;
}

function buildNamespacedRequire(variableDeclarations: string[], sourceValue: string) {
  return `
    ${variableDeclarations[0]} = require("${sourceValue}");
  `;
}

function buildRequireWithVariableAssignments(
  variableAssignments: [string, string][],
  sourceValue: string,
  index: number,
) {
  return `
    const ${`require_${index}`} = require("${sourceValue}");
    ${variableAssignments.map(([varName, propName]) => `${varName} = ${`require_${index}`}.${propName}`).join("\n")}
  `;
}
