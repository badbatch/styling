import { CSSObject } from "postcss-js";

export default function transformRulesArrayToObject(cssArray: CSSObject[]) {
  return cssArray.reduce((cssObject, entry) => {
    return { ...cssObject, ...entry };
  }, {});
}
