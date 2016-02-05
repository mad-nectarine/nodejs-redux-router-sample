require('babel-polyfill')
import * as React from 'react'
import * as ReactDom from 'react-dom'
import * as ReactRouter from 'react-router'
import ReduxProviderLayout from '../components/layouts/ReduxProviderLayout';
import * as App from '../apps/SpaApp'
import * as StoreFactory from '../util/storefactory'

//get node and parameter
const rootElement = document.getElementById("root");
const initialState = JSON.parse(rootElement.getAttribute("data-initialstate"));
const isDevelopment = rootElement.getAttribute("data-dev") == "true";
const history = ReactRouter.browserHistory 

//create store
let store = StoreFactory.createForRouterAppOnClient({
    history,
    initialState,
    reducers : App.getReducers(),
    hasDevTool : isDevelopment
})

//render contents
let contents = (
	<ReduxProviderLayout store={store} hasDevTool={isDevelopment} >
        <ReactRouter.Router history={history}>
            {App.getRoutes("/test")}
		  </ReactRouter.Router>
		</ReduxProviderLayout>);
ReactDom.render(contents,rootElement);