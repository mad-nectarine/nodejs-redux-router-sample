import * as express from 'express';
import { createLocation } from 'history';
var ReduxRouter = require('redux-router/server');
import * as App from '../apps/SpaApp'
var router = express.Router();

/* GET home page. */
router.get('/*', function(req: express.Request, res: express.Response, next: Function) {
   
    let store = App.CreateServerStore(null,true)
    const location = createLocation(req.url)
    store.dispatch(ReduxRouter.match(location, (error, redirectLocation) => {
        if (error) {
            // handle error
        } else if (redirectLocation) {
            // handle redirect
        } else {
            // Everything is fine, render like normal
            res.render('Spa', { title: 'Spa Application', store });
        }
    }))
})

export default router;
module.exports = router;