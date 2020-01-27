import { assignWith } from "lodash";
import postcss from "postcss";
import postcssJs, { CSSObject } from "postcss-js";
import { MEDIA_CSS_RULE } from "../constants";

function mergeCSS(existingCSS: CSSObject, newCSS: CSSObject): CSSObject {
  return assignWith({}, existingCSS, newCSS, (objValue, srcValue, key) => {
    if (!key?.startsWith(MEDIA_CSS_RULE)) return undefined;

    return mergeCSS(objValue, srcValue);
  });
}

export default function mergeNewCSSIntoExisting(newCSS: string, existingCSS: string) {
  const newCSSOjb = postcssJs.objectify(postcss.parse(newCSS));
  const existingCSSObj = postcssJs.objectify(postcss.parse(existingCSS));

  return postcss().process(mergeCSS(existingCSSObj, newCSSOjb), {
    from: undefined,
    parser: postcssJs.parse,
  }).css;
}
