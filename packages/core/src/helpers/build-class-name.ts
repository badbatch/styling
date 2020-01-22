export default function buildClassNames(
  inheritedStylingClassNames?: string,
  stylingClassNames?: string,
  className?: string,
) {
  let combined = "";

  if (inheritedStylingClassNames) {
    combined += inheritedStylingClassNames;
  }

  if (stylingClassNames) {
    if (combined) {
      combined += " ";
    }

    combined += stylingClassNames;
  }

  if (className) {
    if (combined) {
      combined += " ";
    }

    combined += className;
  }

  return combined;
}
