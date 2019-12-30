declare module "postcss-js" {
  export type CSSValueList = Array<string | number | CSSObject>;

  export interface CSSObject {
    [key: string]: string | number | CSSObject | CSSValueList;
  }

  export function async(plugins: any): any;
  export function objectify(node: any): CSSObject;
  export function parse(obj: any): any;
  export function sync(plugins: any): any;
}
