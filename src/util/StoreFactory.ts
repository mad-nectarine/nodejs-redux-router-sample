import { Reducer, Middleware, compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { devTools, persistState } from 'redux-devtools'
import { createHistory, createLocation } from 'history'
var { routerStateReducer, reduxReactRouter } = require('redux-router')
var ReduxRouterServer = require('redux-router/server')

export function ServerDefault(reducer: Reducer, initialState: any, hasDevTool: boolean): any {
	let storeComponents = [
		applyMiddleware(thunk)
	];
	if (hasDevTool) {
		storeComponents = storeComponents.concat([
			devTools()
		]);
	}
	return Make(reducer, initialState, ...storeComponents);
}

export function RouterAppServerDefault(routes : any, reducers: any, initialState: any, hasDevTool: boolean) {

	//const middleware = [createMiddleware(client), transitionMiddleware];
	let reducer = {
		router: routerStateReducer
	}
	Object.assign(reducer, reducers)
	
	let finalCreateStore;
	
	finalCreateStore = applyMiddleware(thunk)(createStore);
	finalCreateStore = ReduxRouterServer.reduxReactRouter({ routes })(finalCreateStore);
	const store = finalCreateStore(combineReducers(reducer));
	return store;


	

	// let storeComponents = [
	// 	applyMiddleware(thunk),
	// 	ReduxRouterServer.reduxReactRouter({ routes })
	// ]
	// if (hasDevTool) {
	// 	storeComponents = storeComponents.concat([
	// 		devTools()
	// 	])
	// }
	
	// return CcreateStore(reduxReactRouter, routes, createHistory, reducer);

	//return Make(reducer, initialState, ...storeComponents)
}

export function RouterAppClientDefault(reducers: any, initialState: any, hasDevTool: boolean) {
	let reducer = {
		router: routerStateReducer
	}
	Object.assign(reducer, reducers)

	let storeComponents = [
		applyMiddleware(thunk),
		reduxReactRouter({ createHistory })
	]
	if (hasDevTool) {
		storeComponents = storeComponents.concat([
			devTools()
		])
	}

	return Make(combineReducers(reducer), initialState, ...storeComponents)
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