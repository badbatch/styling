export type Func = (...args: any[]) => any; // tslint:disable-line no-any

export interface InterpolationArray extends Array<Interpolation> {}

export type Interpolation = string | number | ((props: PlainObject) => Interpolation) | InterpolationArray;

export interface PlainObject {
  [key: string]: any; // tslint:disable-line no-any
}

export interface StringObject {
  [key: string]: string;
}

export interface Metadata {
  componentName: string;
  propList?: PropList;
  sourceFilename: string;
}

export type EnumPropList = Array<[string, string[]]>;

export type CSSVariablePropList = Array<[string, string | number]>;

export type PropListWithoutCSSVariables = Array<string | [string, string[]]>;

export type PropList = Array<string | [string, string[]] | [string, string | number]>;
