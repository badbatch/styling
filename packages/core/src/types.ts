import { PlainObject } from "@styling/types";
import { ReactNode } from "react";

export type ForwardedProps<P extends object> = { children?: ReactNode; className?: string } & P;

export type ReturnedElementProps<P extends {}, R extends Element> = {
  children?: ReactNode;
  className?: string;
  ref?: React.Ref<R>;
} & P;

export interface RawStylingConfig {
  theme?: string;
}

export type StylingEnumProps = Array<[string, string[]]>;

export type StylingProps<P extends {}> = Array<keyof P | [keyof P, string[]]>;

export type StylingPropsGeneric = Array<string | [string, string[]]>;

export interface StylingConfig {
  theme?: PlainObject;
}
