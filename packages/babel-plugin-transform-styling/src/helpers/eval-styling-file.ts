import { error } from "@styling/helpers";
import { removeSync, writeFileSync } from "fs-extra";
import { parse } from "path";
import { StylingExports } from "../types";

export default function evalStylingFile(code: string, filename: string) {
  const { dir, ext, name } = parse(filename);
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
