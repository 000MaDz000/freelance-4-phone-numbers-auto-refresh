
if (process.env.NODE_ENV === "development") {
    require("ts-node").register();
require("../main/index.ts")
    }
    else {
        require("./main/index.js");
}
