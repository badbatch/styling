import { error, getFullOutputPath, loadStylingConfig } from "@styling/helpers";
import { existsSync, removeSync, writeFileSync } from "fs-extra";
import { parse } from "path";
import { StylingExports } from "../types";

export default function evalStylingFile(code: string, sourceFilename: string) {
  const { outputPath } = loadStylingConfig({ sourceFilename });
  const fullOutputPath = getFullOutputPath(outputPath, sourceFilename);

  if (existsSync(fullOutputPath)) {
    removeSync(fullOutputPath);
  }

  const { dir, ext, name } = parse(sourceFilename);
  const tempFilePath = `${dir}/__${name}.temp${ext}`;
  writeFileSync(tempFilePath, code, { encoding: "utf-8" });

  require("@babel/register")({
    plugins: ["@babel/plugin-transform-modules-commonjs"],
    presets: [
      [
        "@babel/preset-env",
        {
          modules: "commonjs",
          targets: { node: "current" },
        },
      ],
    ],
  });

  let output: StylingExports | undefined;

  try {
    output = require(tempFilePath);
    removeSync(tempFilePath);
  } catch (e) {
    error("Error evaluating styling file", e);
    removeSync(tempFilePath);
  }

  return output;
}
