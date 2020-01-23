import murmurhash from "murmurhash";
import { resolve } from "path";
import { CACHED_FILES_FOLDER_NAME, TXT_FILE_EXT } from "./constants";
import getStylingFolderPath from "./get-styling-folder-path";

export default function getCachedFilePath(filename: string) {
  return resolve(getStylingFolderPath(), CACHED_FILES_FOLDER_NAME, `${murmurhash.v3(filename)}${TXT_FILE_EXT}`);
}
