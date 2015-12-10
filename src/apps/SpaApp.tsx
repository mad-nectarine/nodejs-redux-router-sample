// == import installed modules ==
import * as React from 'react'
import { bindActionCreators } from 'redux';
var { ReduxRouter, reduxReactRouter, pushState} = require('redux-router')
import { Route } from 'react-router';
import { connect } from 'react-redux';
// == import application modules ==
import DefaultLayout from '../components/layouts/DefaultLayout'
import * as SpaContainerActions from '../actions/SpaContainerActions'
import SpaContainer from '../components/views/SpaContainer'
import SpaContainerReducer from '../reducers/SpaContainerReducer'
import SpaChildReducer from '../reducers/SpaChildReducer'
import SpaParent from '../components/views/SpaParent'
import SpaChild from '../components/views/SpaChild'
import * as StoreFactory from '../util/StoreFactory'

//====== bind state and action to components props ======
var components = {
    /* bind SpaContainer */
    SpaContainer: connect(
        (state) => {
            return {
                message: state.container.message
            }
        },
        (dispatch) => {
            //merge actions
            let actions = {
                pushState //"pushState" is a function,so you must set as a property.  
            };
            Object.assign(actions, SpaContainerActions);
            //you can merge more actions
            //Object.assign(actions, hogeActionCreator, fugaActionCreator);
    
            //bind actions to dispatcher 
            return bindActionCreators(actions, dispatch);
        })(SpaContainer),
    
    /* bind SpaChild */
    SpaChild: connect(
        (state) => {
            return {
                message: state.child.message,
                containerMessage: state.container.message
            }
        },
        (dispatch) => {
            //merge actions
            let actions = { pushState };
            Object.assign(actions, SpaContainerActions);
            return bindActionCreators(actions, dispatch);
        })(SpaChild)
}
//====== create store functions ======
export function CreateServerStore(initialState: any, isDevelopment: boolean) {
    var reducer = {
        container: SpaContainerReducer,
        child: SpaChildReducer
    };
    //create store
    let store = StoreFactory.RouterAppServerDefault(getRoutes(), reducer, initialState, isDevelopment);
    return store;
}
export function CreateClientStore(initialState: any, isDevelopment: boolean) {

    var reducer = {
        container: SpaContainerReducer,
        child: SpaChildReducer
    };
    //create store
    let store = StoreFactory.RouterAppClientDefault(reducer, initialState, isDevelopment);
    return store;
}

//====== app component ======
export function getRoutes() {
    return (<Route path="/" component={components.SpaContainer}>
                <Route path="parent" component={SpaParent}>
                    <Route path="child" component={components.SpaChild} />
                    <Route path="child/:id" component={components.SpaChild} />
                    </Route>
        </Route>)
}

export class SpaApp extends React.Component<any, any> {
    render() {
        return (
            <DefaultLayout>
            <ReduxRouter>
                    {getRoutes() }
                </ReduxRouter>
                </DefaultLayout>
        )
    }
}
