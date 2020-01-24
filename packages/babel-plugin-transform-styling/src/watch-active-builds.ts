import { getStylingFolderPath, info } from "@styling/helpers";
import { readFileSync, watch } from "fs-extra";
import { resolve } from "path";
import { ACTIVE_BUILDS_FILENAME, TXT_FILE_EXT } from "./constants";

export default function watchActiveBuilds({ filename, id }: { filename: string; id: string }) {
  const activeBuildsFilePath = resolve(getStylingFolderPath(), `${ACTIVE_BUILDS_FILENAME}${TXT_FILE_EXT}`);
  info(`Watching ${filename}`);

  const watcher = watch(activeBuildsFilePath, { encoding: "utf8" }, eventType => {
    if (eventType !== "change") return;

    const activeBuilds = readFileSync(activeBuildsFilePath, { encoding: "utf8" }).split(",");
    if (activeBuilds.find(activeBuild => activeBuild === id)) return;

    info(`Closing watcher of ${filename}`);
    watcher.close();
  });
}
