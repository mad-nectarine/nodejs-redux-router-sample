'use strict';

require('babel-polyfill');
var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');
var ReduxProviderLayout_1 = require('../components/layouts/ReduxProviderLayout');
var App = require('../apps/SpaApp');
var StoreFactory = require('../util/storefactory');
//get node and parameter
var rootElement = document.getElementById("root");
var initialState = JSON.parse(rootElement.getAttribute("data-initialstate"));
var isDevelopment = rootElement.getAttribute("data-dev") == "true";
var history = ReactRouter.browserHistory;
//create store
var store = StoreFactory.createForRouterAppOnClient({
    history: history,
    initialState: initialState,
    reducers: App.getReducers(),
    hasDevTool: isDevelopment
});
//render contents
var contents = React.createElement(ReduxProviderLayout_1.default, { "store": store, "hasDevTool": isDevelopment }, React.createElement(ReactRouter.Router, { "history": history }, App.getRoutes("/test")));
ReactDom.render(contents, rootElement);