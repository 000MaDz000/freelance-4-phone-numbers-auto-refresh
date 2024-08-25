import { join } from "path";
import MakeNumbersDir from "./make-numbers-dir";
import MakeNumbersFiles from "./make-numbers-files";
import MakeSettingsFile from "./make-settings";

export const filesChecker = (home: string) => {
    const areenFile = join(home, "areen.txt");
    const quecklineFile = join(home, "queckline.txt");
    const settings = join(home, "settings.json");

    MakeNumbersDir();
    MakeNumbersFiles(areenFile, quecklineFile);
    MakeSettingsFile(settings);

}