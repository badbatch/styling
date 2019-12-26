import { Interpolation, PlainObject } from "@styling/types";
import { isArray, isFunction } from "lodash";

function collateRule(css: string, rule: Interpolation, props: PlainObject) {
  const trimmedCSS = css.trim();
  let _css = "";

  if (isFunction(rule)) {
    const styles = rule(props);

    if (styles) {
      _css += collateRule(trimmedCSS, styles, props);
    } else if (trimmedCSS.charAt(trimmedCSS.length - 1) === ":") {
      _css += "null";
    }
  } else if (isArray(rule)) {
    _css += collateRules(rule, props);
  } else {
    _css += String(rule);
  }

  return _css;
}

function collateRules(rules: Interpolation[], props: PlainObject) {
  return rules.reduce((css: string, rule) => {
    let _css = css;
    _css += collateRule(css, rule, props);
    return _css;
  }, "");
}

export default function collateCSS(interpolations: Interpolation[], props: PlainObject, theme: PlainObject = {}) {
  return collateRules(interpolations, { ...props, theme });
}
