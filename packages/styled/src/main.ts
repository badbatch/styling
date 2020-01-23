import { generatePropKeyCombos } from "@styling/helpers";
import { Interpolation, PropList } from "@styling/types";
import { ComponentType, ReactHTML, ReactSVG } from "react";
import buildClassNamesMapAndWriteCSS from "./helpers/build-classnames-map-and-write-css";
import filterCSSVariables from "./helpers/filter-css-variables";
import filterOutCSSVariables from "./helpers/filter-out-css-variables";
import interweaveInterpolations from "./helpers/interweave-interpolations";
import { PropListExact } from "./types";

export default function styled<P extends {}>(
  component: ComponentType | keyof ReactHTML | keyof ReactSVG,
  propList: PropListExact<P>,
  componentName: string,
  sourceFilename: string,
) {
  return (strings: TemplateStringsArray, ...values: Interpolation[]) => {
    const _propList = (propList as unknown) as PropList;

    return {
      propList,
      ...buildClassNamesMapAndWriteCSS(
        generatePropKeyCombos(filterOutCSSVariables(_propList)),
        filterCSSVariables(_propList),
        interweaveInterpolations(strings, values),
        { componentName, propList: _propList, sourceFilename },
      ),
    };
  };
}
