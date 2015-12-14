'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SpaApp = undefined;
exports.CreateServerStore = CreateServerStore;
exports.CreateClientStore = CreateClientStore;
exports.getRoutes = getRoutes;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _redux = require('redux');

var _reactRouter = require('react-router');

var _reactRedux = require('react-redux');

var _DefaultLayout = require('../components/layouts/DefaultLayout');

var _DefaultLayout2 = _interopRequireDefault(_DefaultLayout);

var _AppContainer = require('../components/views/AppContainer');

var _AppContainer2 = _interopRequireDefault(_AppContainer);

var _UrlUnMatch = require('../components/views/UrlUnMatch');

var _UrlUnMatch2 = _interopRequireDefault(_UrlUnMatch);

var _StoreFactory = require('../util/StoreFactory');

var StoreFactory = _interopRequireWildcard(_StoreFactory);

var _BasicParent = require('../components/views/BasicParent');

var _BasicParent2 = _interopRequireDefault(_BasicParent);

var _BasicParentActions = require('../actions/BasicParentActions');

var BasicParentActions = _interopRequireWildcard(_BasicParentActions);

var _BasicParentReducer = require('../reducers/BasicParentReducer');

var _BasicParentReducer2 = _interopRequireDefault(_BasicParentReducer);

var _BasicChild = require('../components/views/BasicChild');

var _BasicChild2 = _interopRequireDefault(_BasicChild);

var _BasicChildActions = require('../actions/BasicChildActions');

var BasicChildActions = _interopRequireWildcard(_BasicChildActions);

var _BasicChildReducer = require('../reducers/BasicChildReducer');

var _BasicChildReducer2 = _interopRequireDefault(_BasicChildReducer);

var _ListDetailParent = require('../components/views/ListDetailParent');

var _ListDetailParent2 = _interopRequireDefault(_ListDetailParent);

var _ListDetailParentActions = require('../actions/ListDetailParentActions');

var ListDetailParentActions = _interopRequireWildcard(_ListDetailParentActions);

var _ListDetailParentReducer = require('../reducers/ListDetailParentReducer');

var _ListDetailParentReducer2 = _interopRequireDefault(_ListDetailParentReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require('redux-router');

var ReduxRouter = _require.ReduxRouter;
var reduxReactRouter = _require.reduxReactRouter;
var pushState = _require.pushState;

//====== bind state and action to components props ======
var components = {
    /* bind AppContainer */
    AppContainer: (0, _reactRedux.connect)(function (state) {
        return {};
    }, function (dispatch) {
        return (0, _redux.bindActionCreators)({ pushState: pushState }, dispatch);
    })(_AppContainer2.default),
    /* bind BasicParent */
    BasicParent: (0, _reactRedux.connect)(function (state) {
        return {
            message: state.basicParent.message
        };
    }, function (dispatch) {
        //merge actions
        var actions = {
            pushState: pushState //"pushState" is a function,so you must set as a property. 
        };
        Object.assign(actions, BasicParentActions);
        //you can merge more actions
        //Object.assign(actions, hogeActionCreator, fugaActionCreator);
        //bind actions to dispatcher
        return (0, _redux.bindActionCreators)(actions, dispatch);
    })(_BasicParent2.default),
    /* bind BasicChild */
    BasicChild: (0, _reactRedux.connect)(function (state) {
        return {
            message: state.basicChild.message,
            parentMessage: state.basicParent.message
        };
    }, function (dispatch) {
        //merge actions
        var actions = { pushState: pushState };
        Object.assign(actions, BasicChildActions);
        return (0, _redux.bindActionCreators)(actions, dispatch);
    })(_BasicChild2.default),
    /* bind BasicChild */
    ListDetailParent: (0, _reactRedux.connect)(function (state) {
        return {
            selectedId: state.listDetailParent.selectedId,
            items: state.listDetailParent.items
        };
    }, function (dispatch) {
        //merge actions
        var actions = { pushState: pushState };
        Object.assign(actions, ListDetailParentActions);
        return (0, _redux.bindActionCreators)(actions, dispatch);
    })(_ListDetailParent2.default)
};
//====== create store functions ======
function CreateServerStore(initialState, isDevelopment) {
    var reducer = {
        basicParent: _BasicParentReducer2.default,
        basicChild: _BasicChildReducer2.default,
        listDetailParent: _ListDetailParentReducer2.default
    };
    //create store
    var store = StoreFactory.RouterAppServerDefault(getRoutes(), reducer, initialState, isDevelopment);
    return store;
}
function CreateClientStore(initialState, isDevelopment) {
    var reducer = {
        basicParent: _BasicParentReducer2.default,
        basicChild: _BasicChildReducer2.default,
        listDetailParent: _ListDetailParentReducer2.default
    };
    //create store
    var store = StoreFactory.RouterAppClientDefault(reducer, initialState, isDevelopment);
    return store;
}
//====== app component ======
function getRoutes() {
    return React.createElement(_reactRouter.Route, { "path": "/", "component": components.AppContainer }, React.createElement(_reactRouter.Route, { "path": "basic/parent", "component": components.BasicParent }, React.createElement(_reactRouter.Route, { "path": "child", "component": components.BasicChild }), React.createElement(_reactRouter.Route, { "path": "child/:id", "component": components.BasicChild })), React.createElement(_reactRouter.Route, { "path": "list", "component": components.ListDetailParent }), React.createElement(_reactRouter.Route, { "path": "*", "component": _UrlUnMatch2.default, "status": 404 }));
}

var SpaApp = exports.SpaApp = (function (_React$Component) {
    _inherits(SpaApp, _React$Component);

    function SpaApp() {
        _classCallCheck(this, SpaApp);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SpaApp).apply(this, arguments));
    }

    _createClass(SpaApp, [{
        key: 'render',
        value: function render() {
            return React.createElement(_DefaultLayout2.default, null, React.createElement(ReduxRouter, null, getRoutes()));
        }
    }]);

    return SpaApp;
})(React.Component);