import autoprefixer from "autoprefixer";
import postcss from "postcss";
import postcssJs from "postcss-js";
import { SelectorCSS } from "../types";

export default function buildCSSStringFromCSSObjects(selectorCSS: SelectorCSS) {
  let css = "";
  const selectors = Object.keys(selectorCSS);

  for (const selector of selectors) {
    const result = postcss([autoprefixer]).process(
      { [`.${selector}`]: selectorCSS[selector].css },
      {
        from: undefined,
        parser: postcssJs.parse,
      },
    );

    css += `${result.css}\n`;
  }

  return css;
}
