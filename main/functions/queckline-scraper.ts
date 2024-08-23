import { BrowserWindow } from "electron";

export default async function queckLineScraper(customerPhone: string, window: BrowserWindow) {
    const code =
        `
const input = document.getElementById("customerPhone");
const submit = document.getElementById("customSubmitBtn");
input.value = "${customerPhone}";
submit.click();
`;

    await window.webContents.executeJavaScript(code);
}