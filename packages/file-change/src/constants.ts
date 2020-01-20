export const STYLING_FOLDER_NAME = ".styling" as const;
export const LAST_CHECKED_FILES_FILENAME = "last-checked-files.json" as const;

export const IMPORT_REQUIRE_REGEX_GLOB = /import [\s\S]*? from ["'][\S]*?["']|const [\s\S]*? = import\(["'][\S]*?["']\)|const [\s\S]*? = require\(["'][\S]*?["']\)/g;
export const IMPORT_REQUIRE_REGEX = /import [\s\S]*? from ["']([\S]*?)["']|const [\s\S]*? = import\(["']([\S]*?)["']\)|const [\s\S]*? = require\(["']([\S]*?)["']\)/;

export const GLOB_JS_FILE_EXTS = ".+(js|jsx|ts|tsx|json|cjs|mjs)" as const;
