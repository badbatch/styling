import autoprefixer from "autoprefixer";
import { renderSync } from "node-sass";
import postcss from "postcss";
import postcssJs from "postcss-js";
import { StringDecoder } from "string_decoder";
import { PropKeyComboCSS } from "../types";

export default function buildCSSStringFromCSSObjects(propKeyComboCSS: PropKeyComboCSS) {
  return propKeyComboCSS.reduce((css, entry) => {
    const result = postcss([autoprefixer]).process(
      { [`.${entry[1].selector}`]: entry[1].css },
      {
        from: undefined,
        parser: postcssJs.parse,
      },
    );

    css += `${new StringDecoder("utf8").write(renderSync({ data: result.css }).css)}\n`;
    return css;
  }, "");
}
