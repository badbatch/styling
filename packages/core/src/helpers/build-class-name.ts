export default function buildClassNames(stylingClassNames?: string, className?: string) {
  let combined = "";

  if (stylingClassNames) {
    combined += stylingClassNames;
  }

  if (className) {
    if (stylingClassNames) {
      combined += " ";
    }

    combined += className;
  }

  return combined;
}
