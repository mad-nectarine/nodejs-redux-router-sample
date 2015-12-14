'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var express = _interopRequireWildcard(_express);

var _history = require('history');

var _SpaApp = require('../apps/SpaApp');

var App = _interopRequireWildcard(_SpaApp);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var ReduxRouter = require('redux-router/server');

var router = express.Router();
/* GET home page. */
router.get('/*', function (req, res, next) {
    var initialState = {
        baseParent: { message: "init contaier msg on server" },
        baseChild: { message: "init child msg on server" }
    };
    var store = App.CreateServerStore(initialState, true);
    var location = (0, _history.createLocation)(req.url);
    store.dispatch(ReduxRouter.match(location, function (error, redirectLocation) {
        if (error) {} else if (redirectLocation) {} else {
            // Everything is fine, render like normal
            res.render('Spa', { title: 'Spa Application', store: store });
        }
    }));
});
exports.default = router;

module.exports = router;