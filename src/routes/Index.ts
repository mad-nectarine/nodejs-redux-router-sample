import * as express from 'express';
import { createLocation } from 'history';
//var ReduxRouter = require('redux-router/server');
import * as App from '../apps/SpaApp'
var router = express.Router();

/* GET home page. */
router.get('/*', function(req: express.Request, res: express.Response, next: Function) {
    let isDevelopment = process.env.NODE_ENV === 'development'

    let initialState = {
        baseParent: { message: "init contaier msg on server" },
        baseChild: { message: "init child msg on server" },
    }
    let store = App.CreateServerStore(initialState, isDevelopment)
    const location = createLocation(req.url)
    // store.dispatch(ReduxRouter.match(location, (error, redirectLocation) => {
    //     if (error) {
    //         // handle error
    //     } else if (redirectLocation) {
    //         // handle redirect
    //     } else {
    //         // Everything is fine, render like normal
    //         res.render('Spa', { title: 'Spa Application', store, isDevelopment });
    //     }
    // }))
})

export default router;
module.exports = router;