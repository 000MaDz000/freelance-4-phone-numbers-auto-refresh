import { watch } from "chokidar";
import { filesChecker } from "../functions/files/checker";
import { getSettings, SettingsType } from "../functions/files/make-settings";
import { join } from "path";
import { app } from "electron";
import AutoLaunch from "auto-launch";
import { execSync } from "child_process";
import { readFileSync } from "fs";


export default class Lifetime {
    settings: SettingsType;
    homeFilesDir: string;
    areenInterval: NodeJS.Timeout | null;
    quecklineInterval: NodeJS.Timeout | null;

    constructor() {
        const home = join(app.getPath("home"), "numbers");
        filesChecker(home);
        this.areenInterval = null;
        this.quecklineInterval = null;
        this.settings = getSettings();
        this.homeFilesDir = home;
        this.revalidateIntervals(this.settings);
        this.watcher();
        this.setToStartup()
    }

    revalidateIntervals(newSettings: SettingsType) {
        // here we validating the arren interval, if it's not set, will set it, if it's already set, we should clear it to make other one with new settings
        if (!this.areenInterval || newSettings.ExcutionTimeout.areenHours != this.settings.ExcutionTimeout.areenHours) {
            if (this.areenInterval) {
                clearInterval(this.areenInterval);
                this.areenInterval = null;
            }

            this.areenInterval = setInterval(() => {
                console.log("arren inerval has been set");
            }, newSettings.ExcutionTimeout.areenHours * 60 * 60 * 1000) // hours * minutes * seconds * milliseconds = the hourse in milliseconds
        }

        // here we validating the queckline interval, if it's not set, will set it, if it's already set, we should clear it to make other one with new settings
        if (!this.quecklineInterval || newSettings.ExcutionTimeout.queckLineHours != this.settings.ExcutionTimeout.queckLineHours) {
            if (this.quecklineInterval) {
                clearInterval(this.quecklineInterval);
                this.quecklineInterval = null;
            }

            this.quecklineInterval = setInterval(() => {
                console.log("queckline inerval has been set");
            }, newSettings.ExcutionTimeout.queckLineHours * 60 * 60 * 1000) // hours * minutes * seconds * milliseconds = the hourse in milliseconds
        }

    }


    watcher() {
        const watcher = watch(this.homeFilesDir, {
            ignoreInitial: true, // ignore the initial events
            persistent: true, // Keep the process running
        });

        watcher.on("change", (path) => {
            const settings = join(this.homeFilesDir, "settings.json");

            if (path == settings) {
                console.log("settings changed");
                const newSettings = getSettings();
                this.revalidateIntervals(newSettings);
                this.settings = newSettings;
            } else {
                console.log(path, "other file changed");
            }
        });
    }

    setToStartup() {
        const nonUIFileContent =
            `[Unit]
Description=phone numbers auto refresh

[Service]
ExecStart=${app.getPath("exe")} --no-sandbox
Restart=always
User=root
Group=root
WorkingDirectory${app.getPath("exe")}

[Install]
WantedBy=multi-user.target`;

        if (process.platform === "linux") {

            const serviceFilePath = '/etc/systemd/system/phone-numbers-refresh.service';
            const isDesktop = (process.env.DISPLAY || process.env.XDG_SESSION_TYPE || process.env.GDK_BACKEND) && !this.isXvfbRunning();

            if (isDesktop) {
                const launch = new AutoLaunch({
                    "path": app.getPath("exe"),
                    "name": "refresh phone numbers",
                    "isHidden": true
                });

                launch.enable();
            }
            else {
                console.log("this Operating system is a server with non ui");

                if (readFileSync(serviceFilePath)) {
                    console.log("the service is already created");
                    return;
                }

                console.log("will use super user permission to add the app to startup");
                try {
                    execSync(`sudo echo "${nonUIFileContent}" > ${serviceFilePath}`);
                    execSync("sudo systemctl daemon-reload");
                    execSync(`sudo systemctl enable phone-numbers-refresh`);
                    console.log("service installed");
                }
                catch (err) {
                    console.log("failed to add the app to startup")
                    console.log(err);
                }
            }

        }
        else {

            const launch = new AutoLaunch({
                "path": app.getPath("exe"),
                "name": "refresh phone numbers",
                "isHidden": true
            });

            launch.enable();
        }
    }

    isXvfbRunning() {
        try {
            const stdout = execSync('ps aux | grep [X]vfb').toString();
            return stdout.trim() !== '';
        } catch (error) {
            return false; // إذا حدث خطأ، نفترض أن Xvfb غير قيد التشغيل
        }
    }
}