import { BrowserWindow } from "electron";
const allTypes = ["keyDown", "char", "keyUp"];

export default async function areenScraper(customerPhone: string, window: BrowserWindow) {
    await window.webContents.executeJavaScript("document.querySelector('input').focus()");

    for (let character of customerPhone) {
        // need to send keystrokes because reactJS is using virtual dom
        allTypes.forEach((event: any) => {
            window.webContents.sendInputEvent({
                "keyCode": character,
                "type": event,
            });
        });

    }

    // after input the customer phone, need to click on the button
    // while i checking that web page, i noticed somthing, when querySelectorAll("button"), the submit button is always the lastone
    await window.webContents.executeJavaScript(`
        const buttons = document.querySelectorAll("button");
        const length = buttons.length;
        buttons.item(length - 1).click();
        
            let counter = 0;
            const interval = setInterval(() => {
                const buttons = document.querySelectorAll("button");
                const lastone = buttons.item(buttons.length - 1);
                lastone.click();
                counter++;
                if(counter == 2) {
                    console.log("success");
                    clearInterval(interval);
                }
            },1000);

            "success"
        `)
}