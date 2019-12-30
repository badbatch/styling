import { isEqual, isPlainObject } from "lodash";
import postcssJs from "postcss-js";

export default function dedupeCSS(css: postcssJs.CSSObject, baseCSS: postcssJs.CSSObject) {
  const dedupedCSS: postcssJs.CSSObject = {};

  Object.keys(css).forEach(key => {
    if (!baseCSS[key]) {
      dedupedCSS[key] = css[key];
    } else if (!isEqual(css[key], baseCSS[key])) {
      if (isPlainObject(css[key])) {
        dedupedCSS[key] = dedupeCSS(css[key] as postcssJs.CSSObject, baseCSS[key] as postcssJs.CSSObject);
      } else {
        dedupedCSS[key] = css[key];
      }
    }
  });

  return dedupedCSS;
}
