'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RouterAppServerDefault = RouterAppServerDefault;
exports.RouterAppClientDefault = RouterAppClientDefault;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxDevtools = require('redux-devtools');

var _history = require('history');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('redux-router');

var routerStateReducer = _require.routerStateReducer;
var reduxReactRouter = _require.reduxReactRouter;

var ReduxRouterServer = require('redux-router/server');
function RouterAppServerDefault(routes, reducers, initialState, hasDevTool) {
    //** initial state **
    //initial state must not be "undefined"
    //if it is, exception is thrown
    initialState = initialState || {};
    //** merge reducers **
    //you must add reducer for redux-router
    var reducer = {
        router: routerStateReducer
    };
    Object.assign(reducer, reducers);
    var mergedReducer = (0, _redux.combineReducers)(reducer);
    //** set components **
    var finalCreateStore = undefined;
    //#1
    if (hasDevTool) {
        finalCreateStore = (0, _reduxDevtools.devTools)()(_redux.createStore);
    } else {
        finalCreateStore = _redux.createStore;
    }
    //#2
    // finalCreateStore = applyMiddleware(thunk)(createStore)
    // if (hasDevTool) {
    // 	finalCreateStore = devTools()(finalCreateStore)
    // }
    //#3
    // let components = [ applyMiddleware(thunk) ]
    // if (hasDevTool) {
    // 	components = components.concat([
    // 		devTools()
    // 	])
    // }
    //finalCreateStore = compose(...components)(createStore)
    //** for redux-router / on server **
    //1. must use reduxReactRouter for server
    //2. routes is required -- ex: function getRoutes() { return (<Route path="/" component="hoge">....) }
    finalCreateStore = ReduxRouterServer.reduxReactRouter({ routes: routes })(finalCreateStore);
    return finalCreateStore(mergedReducer, initialState);
}
function RouterAppClientDefault(reducers, initialState, hasDevTool) {
    //** initial state **
    //initial state must not be "undefined"
    //if it is, exception is thrown
    initialState = initialState || {};
    //** merge reducers **
    //you must add reducer for redux-router
    var reducer = {
        router: routerStateReducer
    };
    Object.assign(reducer, reducers);
    var mergedReducer = (0, _redux.combineReducers)(reducer);
    //** set components **
    var finalCreateStore = undefined;
    var components = [(0, _redux.applyMiddleware)(_reduxThunk2.default)];
    if (hasDevTool) {
        components = components.concat([(0, _reduxDevtools.devTools)(), (0, _reduxDevtools.persistState)(window.location.href.match(/[?&]debug_session=([^&]+)\b/))]);
    }
    finalCreateStore = _redux.compose.apply(undefined, _toConsumableArray(components))(_redux.createStore);
    //** for redux-router / on client **
    //1. must use reduxReactRouter for client
    //2. you can use createHistory, only on client
    finalCreateStore = reduxReactRouter({ createHistory: _history.createHistory })(finalCreateStore);
    return finalCreateStore(mergedReducer, initialState);
}
/* =========== not use this sample ============*/
/*
import { Reducer, Middleware, compose } from 'redux'

export function ServerDefault(reducer: Reducer, initialState: any, hasDevTool: boolean): any {
    let storeComponents = [
        applyMiddleware(thunk)
    ];
    if (hasDevTool) {
        storeComponents = storeComponents.concat([
            devTools()
        ]);
    }
    return Make(reducer, initialState, ...storeComponents)
}
export function ClientDefault(reducer: Reducer, initialState: any, hasDevTool: boolean): any {
    let storeComponents = [
        applyMiddleware(thunk)
    ];
    if (hasDevTool) {
        storeComponents = storeComponents.concat([
            devTools(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        ]);
    }
    return Make(reducer, initialState, ...storeComponents);
}

export function Make(reducer: Reducer, initialState: any, ...storeComponents: Function[]): any {
    let finalCreateStore = compose(...storeComponents)(createStore);
    return finalCreateStore(reducer, initialState);
}
*/