import { statSync, writeFileSync } from "fs";

export default function MakeNumbersFiles(areenFile: string, quecklineFile: string) {
    try {
        if (!statSync(areenFile).isFile()) {
            writeFileSync(areenFile, "");
        }
    }
    catch (err) {
        writeFileSync(areenFile, "");

    }



    try {
        if (!statSync(quecklineFile).isFile()) {
            writeFileSync(quecklineFile, "");
        }
    } catch (err) {
        writeFileSync(quecklineFile, "");
    }
}