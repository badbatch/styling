import {
  ComponentType,
  ForwardRefExoticComponent,
  PropsWithChildren,
  ReactHTML,
  ReactNode,
  ReactSVG,
  RefForwardingComponent,
} from "react";

export type ForwardRefComponent<P extends object> = ForwardRefExoticComponent<P> & {
  readonly $$typeof: symbol;
  render: RefForwardingComponent<any, PropsWithChildren<{}>>; // tslint:disable-line no-any
};

export interface ForwardedProps {
  as?: ComponentType | keyof ReactHTML | keyof ReactSVG;
  children?: ReactNode;
  className?: string;
  [key: string]: any; // tslint:disable-line no-any
}

export interface ReturnedElementProps {
  children?: ReactNode;
  className?: string;
  ref?: React.Ref<any>; // tslint:disable-line no-any
  stylingClassNames?: string;
  [key: string]: any; // tslint:disable-line no-any
}

export type StylingComponent<P extends object> = ForwardRefComponent<P> & {
  component?: StylingComponentOrTagType<P>;
  isStyling?: true;
};

export type StylingComponentOrTagType<P extends object> =
  | ComponentType
  | ForwardRefComponent<P>
  | StylingComponent<P>
  | keyof ReactHTML
  | keyof ReactSVG;

export type StylingComponentType = ComponentType | ForwardRefComponent<{}> | StylingComponent<{}>;
