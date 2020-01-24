import appRoot from "app-root-path";

export default function replaceAppRoot(code: string) {
  return code.replace(new RegExp(`${appRoot.toString()}`, "g"), "path/to/app-root");
}
