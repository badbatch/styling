import appRoot from "app-root-path";
import murmurhash from "murmurhash";
import { resolve } from "path";
import { CACHED_FILES_FOLDER_NAME, STYLING_FOLDER_NAME, TXT_FILE_EXT } from "./constants";

export default function getCachedFilePath(filename: string) {
  return resolve(
    appRoot.toString(),
    STYLING_FOLDER_NAME,
    CACHED_FILES_FOLDER_NAME,
    `${murmurhash.v3(filename)}${TXT_FILE_EXT}`,
  );
}
