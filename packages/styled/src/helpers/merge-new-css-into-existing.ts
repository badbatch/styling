import { assignWith, isArray } from "lodash";
import postcss from "postcss";
import postcssJs, { CSSObject } from "postcss-js";
import { MEDIA_CSS_RULE } from "../constants";
import transformRulesArrayToObject from "./transform-rules-array-to-object";

function mergeCSS(existingCSS: CSSObject, newCSS: CSSObject): CSSObject {
  return assignWith({}, existingCSS, newCSS, (existingValue, newValue, key) => {
    if (!key?.startsWith(MEDIA_CSS_RULE) || !existingValue || !newValue) return undefined;

    const existingRules = isArray(existingValue) ? transformRulesArrayToObject(existingValue) : existingValue;
    const newRules = isArray(newValue) ? transformRulesArrayToObject(newValue) : newValue;
    return mergeCSS(existingRules, newRules);
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
