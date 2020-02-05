import { error, getStylingFolderPath, info } from "@styling/helpers";
import { watch } from "fs-extra";
import { resolve } from "path";
import { ACTIVE_BUILDS_FILENAME, TXT_FILE_EXT } from "./constants";
import getActiveBuilds from "./helpers/get-active-builds";

export default function watchActiveBuilds({ filename, id }: { filename: string; id: string }) {
  const activeBuildsFilePath = resolve(getStylingFolderPath(), `${ACTIVE_BUILDS_FILENAME}${TXT_FILE_EXT}`);

  if (!getActiveBuilds(activeBuildsFilePath).find(activeBuild => activeBuild === id)) {
    info(`No active build to watch for ${filename}`);
    process.exit(0);
  }

  info(`Watching active build for ${filename}`);

  setTimeout(() => {
    error(`The watch active build script has encountered an error for ${filename}`);
    process.exit(1);
  }, 10000);

  const watcher = watch(activeBuildsFilePath, { encoding: "utf8" }, eventType => {
    if (eventType !== "change") return;

    const activeBuilds = getActiveBuilds(activeBuildsFilePath);

    if (activeBuilds.find(activeBuild => activeBuild === id)) {
      info(`Active build still ongoing for ${filename}`);
      return;
    }

    info(`Closing watcher of ${filename}`);
    watcher.close();
    process.exit(0);
  });
}
