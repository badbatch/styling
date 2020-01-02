import { ComponentType, ReactHTML, ReactNode, ReactSVG } from "react";

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
  [key: string]: any; // tslint:disable-line no-any
}
