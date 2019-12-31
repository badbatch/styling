export default function buildClassName(stylingClassName?: string, className?: string) {
  let combined = "";

  if (stylingClassName) {
    combined += stylingClassName;
  }

  if (className) {
    if (stylingClassName) {
      combined += " ";
    }

    combined += className;
  }

  return combined;
}
