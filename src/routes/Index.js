'use strict';

var express = require('express');
var history_1 = require('history');
//var ReduxRouter = require('redux-router/server');
var App = require('../apps/SpaApp');
var router = express.Router();
/* GET home page. */
router.get('/*', function (req, res, next) {
    var isDevelopment = process.env.NODE_ENV === 'development';
    var initialState = {
        baseParent: { message: "init contaier msg on server" },
        baseChild: { message: "init child msg on server" }
    };
    var store = App.CreateServerStore(initialState, isDevelopment);
    var location = history_1.createLocation(req.url);
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
});
exports.default = router;
module.exports = router;