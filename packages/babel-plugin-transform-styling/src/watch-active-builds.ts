import { error, getStylingFolderPath, info } from "@styling/helpers";
import { watch } from "fs-extra";
import { resolve } from "path";
import { ACTIVE_BUILDS_FILENAME, TXT_FILE_EXT } from "./constants";
import getActiveBuilds from "./helpers/get-active-builds";

export default function watchActiveBuilds({ filename, id }: { filename: string; id: string }) {
  info(`Args passed to watch active builds script, id: ${id}, filename: ${filename}`);
  const activeBuildsFilePath = resolve(getStylingFolderPath(), `${ACTIVE_BUILDS_FILENAME}${TXT_FILE_EXT}`);
  const activeBuilds = getActiveBuilds(activeBuildsFilePath);
  info(`Current active builds: ${JSON.stringify(activeBuilds)}`);

  if (!activeBuilds.includes(id)) {
    info(`No active build to watch for ${filename}`);
    info(`Current active builds: ${activeBuilds.join()}`);
    process.exit(0);
  }

  info(`Watching active build for ${filename}`);

  setTimeout(() => {
    error(`The watch active build script has exceeded 60 seconds for ${filename}`);
    process.exit(1);
  }, 60000);

  const watcher = watch(activeBuildsFilePath, { encoding: "utf8" }, eventType => {
    if (eventType !== "change") return;

    const _activeBuilds = getActiveBuilds(activeBuildsFilePath);

    if (_activeBuilds.includes(id)) {
      info(`Active build still ongoing for ${filename}`);
      info(`Current active builds: ${_activeBuilds.join()}`);
      return;
    }

    info(`Closing watcher of ${filename}`);
    watcher.close();
    process.exit(0);
  });
}
