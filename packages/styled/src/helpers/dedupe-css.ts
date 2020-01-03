import { buildMapKeyFromPropKeyCombo, generatePropKeyCombos } from "@styling/helpers";
import { isEqual, isPlainObject } from "lodash";
import { CSSObject } from "postcss-js";
import { PropKeyComboCSS } from "../types";

function dedupe(css: CSSObject, srcCSS: CSSObject) {
  const dedupedCSS: CSSObject = {};

  Object.keys(css).forEach(key => {
    if (!srcCSS[key]) {
      dedupedCSS[key] = css[key];
    } else if (!isEqual(css[key], srcCSS[key])) {
      if (isPlainObject(css[key])) {
        dedupedCSS[key] = dedupe(css[key] as CSSObject, srcCSS[key] as CSSObject);
      } else {
        dedupedCSS[key] = css[key];
      }
    }
  });

  return dedupedCSS;
}

export default function dedupeCSS(css: CSSObject, propKeyCombo: string[], propKeyComboCSS: PropKeyComboCSS) {
  let dedupedCSS = dedupe(css, propKeyComboCSS.base.css);
  if (propKeyCombo.length === 1) return dedupedCSS;

  const combosOfCombo = generatePropKeyCombos(propKeyCombo);

  combosOfCombo.forEach(combo => {
    const propNameCSS = propKeyComboCSS[buildMapKeyFromPropKeyCombo(combo)];
    if (!propNameCSS) return;

    dedupedCSS = dedupe(dedupedCSS, propNameCSS.css);
  });

  return dedupedCSS;
}
