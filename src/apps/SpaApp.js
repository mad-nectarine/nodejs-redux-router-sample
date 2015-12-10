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

var _SpaContainerActions = require('../actions/SpaContainerActions');

var SpaContainerActions = _interopRequireWildcard(_SpaContainerActions);

var _SpaContainer = require('../components/views/SpaContainer');

var _SpaContainer2 = _interopRequireDefault(_SpaContainer);

var _SpaContainerReducer = require('../reducers/SpaContainerReducer');

var _SpaContainerReducer2 = _interopRequireDefault(_SpaContainerReducer);

var _SpaChildReducer = require('../reducers/SpaChildReducer');

var _SpaChildReducer2 = _interopRequireDefault(_SpaChildReducer);

var _SpaParent = require('../components/views/SpaParent');

var _SpaParent2 = _interopRequireDefault(_SpaParent);

var _SpaChild = require('../components/views/SpaChild');

var _SpaChild2 = _interopRequireDefault(_SpaChild);

var _StoreFactory = require('../util/StoreFactory');

var StoreFactory = _interopRequireWildcard(_StoreFactory);

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
    /* bind SpaContainer */
    SpaContainer: (0, _reactRedux.connect)(function (state) {
        return {
            message: state.container.message
        };
    }, function (dispatch) {
        //merge actions
        var actions = {
            pushState: pushState //"pushState" is a function,so you must set as a property. 
        };
        Object.assign(actions, SpaContainerActions);
        //you can merge more actions
        //Object.assign(actions, hogeActionCreator, fugaActionCreator);
        //bind actions to dispatcher
        return (0, _redux.bindActionCreators)(actions, dispatch);
    })(_SpaContainer2.default),
    /* bind SpaChild */
    SpaChild: (0, _reactRedux.connect)(function (state) {
        return {
            message: state.child.message,
            containerMessage: state.container.message
        };
    }, function (dispatch) {
        //merge actions
        var actions = { pushState: pushState };
        Object.assign(actions, SpaContainerActions);
        return (0, _redux.bindActionCreators)(actions, dispatch);
    })(_SpaChild2.default)
};
//====== create store functions ======
function CreateServerStore(initialState, isDevelopment) {
    var reducer = {
        container: _SpaContainerReducer2.default,
        child: _SpaChildReducer2.default
    };
    //create store
    var store = StoreFactory.RouterAppServerDefault(getRoutes(), reducer, initialState, isDevelopment);
    return store;
}
function CreateClientStore(initialState, isDevelopment) {
    var reducer = {
        container: _SpaContainerReducer2.default,
        child: _SpaChildReducer2.default
    };
    //create store
    var store = StoreFactory.RouterAppClientDefault(reducer, initialState, isDevelopment);
    return store;
}
//====== app component ======
function getRoutes() {
    return React.createElement(_reactRouter.Route, { "path": "/", "component": components.SpaContainer }, React.createElement(_reactRouter.Route, { "path": "parent", "component": _SpaParent2.default }, React.createElement(_reactRouter.Route, { "path": "child", "component": components.SpaChild }), React.createElement(_reactRouter.Route, { "path": "child/:id", "component": components.SpaChild })));
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