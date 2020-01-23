import { buildMapKeyFromPropKeyCombo, generatePropKeyCombos } from "@styling/helpers";
import { isEqual, isPlainObject } from "lodash";
import { CSSObject } from "postcss-js";
import { PropKeyComboCSS, PropKeyComboCSSEntry } from "../types";

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
  const entry = propKeyComboCSS.find(([key]) => key === "base") as PropKeyComboCSSEntry;
  let dedupedCSS = dedupe(css, entry[1].css);
  if (propKeyCombo.length === 1) return dedupedCSS;

  const combosOfCombo = generatePropKeyCombos(propKeyCombo);

  combosOfCombo.forEach(combo => {
    const comboMapKey = buildMapKeyFromPropKeyCombo(combo);
    const comboEntry = propKeyComboCSS.find(([key]) => key === comboMapKey);
    if (!comboEntry) return;

    dedupedCSS = dedupe(dedupedCSS, comboEntry[1].css);
  });

  return dedupedCSS;
}
