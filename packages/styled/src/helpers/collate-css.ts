import { Interpolation, PlainObject } from "@styling/types";
import { isArray, isFunction } from "lodash";
import postcss from "postcss";
import postcssJs from "postcss-js";
import fixupCSSObject from "./fixup-css-object";

function collateRule(css: string, rule: Interpolation, props: PlainObject) {
  const trimmedCSS = css.trim();
  let _css = "";

  if (isFunction(rule)) {
    const styles = rule(props);

    if (styles) {
      _css += collateRule(trimmedCSS, styles, props);
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
  return fixupCSSObject(postcssJs.objectify(postcss.parse(collateRules(interpolations, { ...props, theme }))));
}
