export type Func = (...args: any[]) => any; // tslint:disable-line no-any

export interface InterpolationArray extends Array<Interpolation> {}

export type Interpolation = string | number | ((props: PlainObject) => Interpolation) | InterpolationArray;

export interface PlainObject {
  [key: string]: any; // tslint:disable-line no-any
}

export interface StringObject {
  [key: string]: string;
}
