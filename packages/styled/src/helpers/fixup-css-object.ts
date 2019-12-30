import { isArray, isNumber, isPlainObject, isString } from "lodash";
import postcssJs from "postcss-js";

export default function fixupCSSObject(cssObject: postcssJs.CSSObject) {
  const fixedUp: postcssJs.CSSObject = {};

  Object.keys(cssObject).forEach(key => {
    if (isPlainObject(cssObject[key])) {
      const fixedUpObject = fixupCSSObject(cssObject[key] as postcssJs.CSSObject);

      if (Object.keys(fixedUpObject).length) {
        fixedUp[key] = fixedUpObject;
      }
    } else if (isArray(cssObject[key])) {
      const cssValues = cssObject[key] as postcssJs.CSSValueList;
      fixedUp[key] = cssValues[cssValues.length - 1];
    } else if (isNumber(cssObject[key]) || (isString(cssObject[key]) && (cssObject[key] as string).length > 0)) {
      fixedUp[key] = cssObject[key];
    }
  });

  return fixedUp;
}
