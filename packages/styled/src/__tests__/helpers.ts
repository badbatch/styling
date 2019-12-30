import { Interpolation } from "@styling/types";
import interweaveInterpolations from "../helpers/interweave-interpolations";

export function getInterpolations(strings: TemplateStringsArray, ...values: Interpolation[]) {
  return interweaveInterpolations(strings, values);
}

export const activeInterpolations = getInterpolations`
  max-height: ${p => p.maxHeight};
  max-width: ${p => p.maxWidth};

  .child-selector-a {
    background-color: red;
    color: ${p => p.error && "red"};
    display: block;
  }
`;

const status = {
  approved: getInterpolations`
    color: green;
  `,
};

export const baseInterpolations = getInterpolations`
  font-family: ${p => p.theme.fontFamily};
  font-size: ${p => p.theme.fontSize};
  font-weight: ${p => p.active && "bold"};
  line-height: ${p => p.theme.lineHeight};
  max-height: auto;
  max-width: initial;
  ${p => status[p.status as "approved"]};

  ::placeholder {
    color: gray;
  }

  .child-selector-a {
    background-color: black;
    color: ${p => p.error && "red"};
    position: fixed;
  }

  .child-selector-b {
    ${p => p.error && "color: red"};
  }

  ${p => p.active && activeInterpolations};
`;

export const props = {
  maxHeight: "var(--max-height, 100%)",
  maxWidth: "var(--max-width, 450px)",
  status: "approved",
};

export const theme = {
  fontFamily: "Arial",
  fontSize: "16px",
  lineHeight: "1.25",
};
