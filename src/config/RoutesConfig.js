"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = RouteConfig;
function RouteConfig(app) {
    app.use("/app", require("../routes/index"));
    app.use("/data", require("../routes/data"));
}