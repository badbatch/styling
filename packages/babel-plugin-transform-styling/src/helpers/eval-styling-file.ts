import { BabelFileResult, transform } from "@babel/core";
import nodeEval from "node-eval";
import { StylingNamedExports } from "../types";

export default function evalStylingFile(code: string, filename: string): StylingNamedExports {
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
  }) as BabelFileResult;

  return nodeEval(transformed.code as string, filename);
}
