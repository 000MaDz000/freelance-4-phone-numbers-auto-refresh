import { app, BrowserWindow } from "electron";
import { AREEN_LINK, QUECKLINE_LINK } from "./constants";
import loading from "./functions/loading";
import queckLineScraper from "./functions/queckline-scraper";
import areenScraper from "./functions/areen-scraper";

const createWindow = async () => {
    const window = new BrowserWindow({
        show: false,
    });

    window.loadURL(AREEN_LINK);
    window.webContents.openDevTools()
    await loading(window);
    // scraping
}

app.whenReady().then(createWindow);
