export const STYLING_FOLDER_NAME = ".styling" as const;
export const LAST_CHECKED_FILES_FILENAME = "last-checked-files.json" as const;

export const IMPORT_REQUIRE_REGEX_GLOB = /import .+ from "(.+)"|const .+ import\("(.+)"\)|const .+ require\("(.+)"\)/g;
export const IMPORT_REQUIRE_REGEX = /import .+ from "(.+)"|const .+ import\("(.+)"\)|const .+ require\("(.+)"\)/;
