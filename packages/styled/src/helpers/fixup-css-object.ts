import { isArray, isNumber, isPlainObject, isString } from "lodash";
import { CSSObject, CSSValueList } from "postcss-js";

export default function fixupCSSObject(cssObject: CSSObject) {
  const fixedUp: CSSObject = {};

  Object.keys(cssObject).forEach(key => {
    if (isPlainObject(cssObject[key])) {
      const fixedUpObject = fixupCSSObject(cssObject[key] as CSSObject);

      if (Object.keys(fixedUpObject).length) {
        fixedUp[key] = fixedUpObject;
      }
    } else if (isArray(cssObject[key])) {
      const cssValues = cssObject[key] as CSSValueList;
      fixedUp[key] = cssValues[cssValues.length - 1];
    } else if (isNumber(cssObject[key]) || (isString(cssObject[key]) && (cssObject[key] as string).length > 0)) {
      fixedUp[key] = cssObject[key];
    }
  });

  return fixedUp;
}
