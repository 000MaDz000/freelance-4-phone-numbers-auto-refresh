import {app, BrowserWindow} from "electron";
import {join} from "path";
const DEV_URL = "http://localhost:3000";
const PRODUCTION_FILE = join(__dirname, "../index.html");
const createWindow = () => {
    const window = new BrowserWindow();
    if(process.env.NODE_ENV === "development") {
        window.loadURL(DEV_URL);
    }
    else {
        window.loadFile(PRODUCTION_FILE)
    }
    window.show();
}
app.whenReady().then(createWindow);
