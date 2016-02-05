import * as express from 'express'
import * as React from 'react'
import * as ReactRouter from 'react-router'
import * as ReactDom from 'react-dom/server'

import * as StoreFactory from '../util/storefactory'
//import RootLayout from '../components/layouts/rootlayout'
import * as App from '../apps/SpaApp'
import ReduxFullPageLayout from '../components/layouts/ReduxFullPageLayout'

var router = express.Router();

router.get('/*', function(req: express.Request, res: express.Response, next: Function) {
    const routes = App.getRoutes(req.baseUrl)
    const history = ReactRouter.createMemoryHistory() //.d.tsにないけど無視
    //const history = ReactRouter.hashHistory
    const location = history.createLocation(req.originalUrl)

    ReactRouter.match({ routes, location }, (error, nextLocation, nextState) => {
        if (error) {
            //todo redirect to error page
            res.status(500).send(error.message);
        } else if (nextLocation) {
            res.redirect(302, nextLocation.pathname + nextLocation.search);
        } else if (nextState) {
            const store = StoreFactory.createForRouterAppOnServer({
                reducers: App.getReducers(),
                history,
                initialState: null
            })
            const layoutProps = {
                store: store,
                history,
                routes
            }
            const contents = React.createElement(ReactRouter.Router, { history }, routes)
            const root = React.createElement(ReduxFullPageLayout, {
                store,
                title: "test",
                pageName: "spa",
                isDevelopment: true
            }, contents)
            const html = ReactDom.renderToString(root)
            res.status(200).send(html);

        } else {
            //todo redirect to error page
            res.status(404).send('Not found');
        }
    })
})
export default router;
module.exports = router;