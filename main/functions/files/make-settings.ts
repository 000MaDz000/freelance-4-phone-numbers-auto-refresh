import { readFileSync, statSync, writeFileSync } from "fs";
let settingsFilePath = "";

export interface SettingsType {
    ExcutionTimeout: {
        areenHours: 5;
        queckLineHours: 5;
    }
}

export const defaultSettings: SettingsType = {
    ExcutionTimeout: {
        areenHours: 5,
        queckLineHours: 5,
    },
};

export default function MakeSettingsFile(settingsFile: string) {
    settingsFilePath = settingsFile;

    try {
        if (!statSync(settingsFile).isFile()) {
            writeFileSync(settingsFile, JSON.stringify(defaultSettings, null, 2));
        }
    }
    catch (err) {
        writeFileSync(settingsFile, JSON.stringify(defaultSettings, null, 2));
    }
}

export function getSettings() {
    let settings: undefined | SettingsType;
    try {
        settings = JSON.parse(readFileSync(settingsFilePath).toString());
    }
    catch (err) { }
    return settings || defaultSettings;
}
