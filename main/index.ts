import { app, BrowserWindow } from "electron";
import { AREEN_LINK, QUECKLINE_LINK } from "./constants";
import queckLineScraper from "./functions/queckline-scraper";
import loading from "./functions/loading";
// import {join} from "path";
// const DEV_URL = "http://localhost:3000";
// const PRODUCTION_FILE = join(__dirname, "../index.html");

const createWindow = async () => {
    const window = new BrowserWindow({
        // show: false,
    });

    window.loadURL(AREEN_LINK);
    await loading(window);
    // await queckLineScraper("hello world", window);

    // setTimeout(() => {
    //     window.close();
    // }, 10000);
}

app.whenReady().then(createWindow);
