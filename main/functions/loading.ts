import { BrowserWindow } from "electron";

export default async function loading(window: BrowserWindow) {
    await new Promise((r) => {
        window.on("ready-to-show", () => r(undefined));
    });

    await new Promise((r) => {
        const interval = setInterval(async () => {
            const isInputLoaded: boolean = await window.webContents.executeJavaScript(`document.querySelector("input") !== null`);
            if (isInputLoaded) {
                clearInterval(interval);
                r(undefined);
            }
        }, 3000);
    });
}