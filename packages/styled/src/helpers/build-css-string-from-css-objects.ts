import autoprefixer from "autoprefixer";
import postcss from "postcss";
import postcssJs from "postcss-js";
import { PropKeyComboCSS } from "../types";

export default function buildCSSStringFromCSSObjects(propKeyComboCSS: PropKeyComboCSS) {
  let css = "";
  const keys = Object.keys(propKeyComboCSS);

  for (const key of keys) {
    const result = postcss([autoprefixer]).process(
      { [`.${propKeyComboCSS[key].selector}`]: propKeyComboCSS[key].css },
      {
        from: undefined,
        parser: postcssJs.parse,
      },
    );

    css += `${result.css}\n`;
  }

  return css;
}
