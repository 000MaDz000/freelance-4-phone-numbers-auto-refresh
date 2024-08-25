import { app, BrowserWindow } from "electron";
import { AREEN_LINK, QUECKLINE_LINK } from "./constants";
import loading from "./functions/loading";
import Lifetime from "./classes/lifetime";
// import queckLineScraper from "./functions/queckline-scraper";
// import areenScraper from "./functions/areen-scraper";
export type CompanyType = "areen" | "queckline";

const createScraperWindow = async (company: CompanyType) => {
    const window = new BrowserWindow({
        show: false,
    });

    switch (company) {
        case "areen":
            window.loadURL(AREEN_LINK);
            break;

        case "queckline":
            window.loadURL(QUECKLINE_LINK);
            break;
    }

    await loading(window);

    return window;
}



app.whenReady().then(() => {
    new Lifetime();
});
