import appRoot from "app-root-path";
import { resolve } from "path";
import { STYLING_FOLDER_NAME } from "./constants";

export default function getStylingFolderPath() {
  return resolve(appRoot.toString(), STYLING_FOLDER_NAME);
}
