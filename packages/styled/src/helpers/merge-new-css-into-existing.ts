import postcss from "postcss";
import postcssJs from "postcss-js";

export default function mergeNewCSSIntoExisting(newCSS: string, existingCSS: string) {
  const newCSSOjb = postcssJs.objectify(postcss.parse(newCSS));
  const existingCSSObj = postcssJs.objectify(postcss.parse(existingCSS));

  return postcss().process(
    { ...existingCSSObj, ...newCSSOjb },
    {
      from: undefined,
      parser: postcssJs.parse,
    },
  ).css;
}
