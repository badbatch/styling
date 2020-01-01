import { BabelFileResult, transform } from "@babel/core";
import nodeEval from "node-eval";
import { StylingNamedExports } from "../types";
import { info } from "./log";

export default function evalStylingFile(code: string, filename: string): StylingNamedExports {
  info(`Transforming code to commonjs`);

  const transformed = transform(code, {
    filename,
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
    sourceType: "module",
  }) as BabelFileResult;

  info(`Evaluating transformed code`);
  return nodeEval(transformed.code as string, filename);
}
