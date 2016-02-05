'use strict';

var redux_1 = require('redux');
var thunk = require('redux-thunk');
var react_router_redux_1 = require('react-router-redux');
//var { routerStateReducer, reduxReactRouter } = require('redux-router')
//var ReduxRouterServer = require('redux-router/server')
function createForRouterAppOnServer(param) {
    var initialState = param.initialState || {};
    //middleware
    var middlewares = [react_router_redux_1.syncHistory(param.history), thunk];
    var middleware = redux_1.applyMiddleware.apply(redux_1, middlewares);
    var finalCreateStore = middleware(redux_1.createStore);
    //reducer
    var mergedReducer = redux_1.combineReducers(Object.assign({ router: react_router_redux_1.routeReducer }, param.reducers));
    //create store
    var store = finalCreateStore(mergedReducer, initialState);
    return store;
}
exports.createForRouterAppOnServer = createForRouterAppOnServer;
function createForRouterAppOnClient(param) {
    var initialState = param.initialState || {};
    //middleware
    var middlewares = [react_router_redux_1.syncHistory(param.history), thunk];
    var middleware = redux_1.applyMiddleware.apply(redux_1, middlewares);
    var finalCreateStore = middleware(redux_1.createStore);
    if (param.hasDevTool) {}
    //reducer
    var mergedReducer = redux_1.combineReducers(Object.assign({ router: react_router_redux_1.routeReducer }, param.reducers));
    //create store
    var store = finalCreateStore(mergedReducer, initialState);
    return store;
}
exports.createForRouterAppOnClient = createForRouterAppOnClient;
function RouterAppServerDefault(routes, reducers, initialState, hasDevTool) {
    //** initial state **
    //initial state must not be "undefined"
    //if it is, exception is thrown
    initialState = initialState || {};
    //** merge reducers **
    //you must add reducer for redux-router
    var reducer = {};
    Object.assign(reducer, reducers);
    var mergedReducer = redux_1.combineReducers(reducer);
    //** set components **
    var finalCreateStore = undefined;
    //#1
    if (hasDevTool) {
        finalCreateStore = devTools()(redux_1.createStore);
    } else {
        finalCreateStore = redux_1.createStore;
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
    //finalCreateStore = ReduxRouterServer.reduxReactRouter({ routes })(finalCreateStore)
    return finalCreateStore(mergedReducer, initialState);
}
exports.RouterAppServerDefault = RouterAppServerDefault;
function RouterAppClientDefault(reducers, initialState, hasDevTool) {
    //** initial state **
    //initial state must not be "undefined"
    //if it is, exception is thrown
    initialState = initialState || {};
    //** merge reducers **
    //you must add reducer for redux-router
    var reducer = {};
    Object.assign(reducer, reducers);
    var mergedReducer = redux_1.combineReducers(reducer);
    //** set components **
    var finalCreateStore = undefined;
    var components = [redux_1.applyMiddleware(thunk)];
    // if (hasDevTool) {
    // 	components = components.concat([
    // 		devTools(),
    // 		persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    // 	])
    // }
    finalCreateStore = redux_1.compose.apply(redux_1, components)(redux_1.createStore);
    //** for redux-router / on client **
    //1. must use reduxReactRouter for client
    //2. you can use createHistory, only on client
    //finalCreateStore = reduxReactRouter({ createHistory })(finalCreateStore)
    return finalCreateStore(mergedReducer, initialState);
}
exports.RouterAppClientDefault = RouterAppClientDefault;
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