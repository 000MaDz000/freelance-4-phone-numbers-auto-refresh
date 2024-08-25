import { app } from "electron";
import { mkdirSync } from "fs";
import { join } from "path";

export default function MakeNumbersDir() {
    const home = join(app.getPath("home"), "numbers");
    // make the directory
    try {
        mkdirSync(home);
    }
    catch (err) { }
}