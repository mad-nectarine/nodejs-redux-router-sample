"use strict";

function RouteConfig(app) {
    app.use("/app", require("../routes/index"));
    app.use("/data", require("../routes/data"));
    app.use("/test", require("../routes/test"));
}
exports.default = RouteConfig;