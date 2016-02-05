import {Express} from 'express';

export default function RouteConfig(app: Express) {
	app.use("/app", require("../routes/index"));
	app.use("/data", require("../routes/data"));
    app.use("/test", require("../routes/test"));
}