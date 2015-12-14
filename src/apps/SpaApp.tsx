// == import installed modules ==
import * as React from 'react'
import { bindActionCreators } from 'redux';
var { ReduxRouter, reduxReactRouter, pushState} = require('redux-router')
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
// == import application modules ==
import DefaultLayout from '../components/layouts/DefaultLayout'
import AppContainer from '../components/views/AppContainer'
import UrlUnMatch  from '../components/views/UrlUnMatch'
import * as StoreFactory from '../util/StoreFactory'
//Basic
import BasicParent from '../components/views/BasicParent'
import * as BasicParentActions from '../actions/BasicParentActions'
import BasicParentReducer from '../reducers/BasicParentReducer'
import BasicChild from '../components/views/BasicChild'
import * as BasicChildActions from '../actions/BasicChildActions'
import BasicChildReducer from '../reducers/BasicChildReducer'
//ListDetail
import ListDetailParent from '../components/views/ListDetailParent'
import * as ListDetailParentActions from '../actions/ListDetailParentActions'
import ListDetailParentReducer from '../reducers/ListDetailParentReducer'


//====== bind state and action to components props ======
var components = {
    
    /* bind AppContainer */
    AppContainer: connect(
        (state) => { 
            return {}
        },
        (dispatch) => {
            return bindActionCreators({ pushState }, dispatch)
        }
    )(AppContainer),
    
    /* bind BasicParent */
    BasicParent: connect(
        (state) => {
            return {
                message: state.basicParent.message
            }
        },
        (dispatch) => {
            //merge actions
            let actions = {
                pushState //"pushState" is a function,so you must set as a property.  
            }
            Object.assign(actions, BasicParentActions)
            //you can merge more actions
            //Object.assign(actions, hogeActionCreator, fugaActionCreator);
    
            //bind actions to dispatcher 
            return bindActionCreators(actions, dispatch)
        })(BasicParent),
    
    /* bind BasicChild */
    BasicChild: connect(
        (state) => {
            return {
                message: state.basicChild.message,
                parentMessage: state.basicParent.message
            }
        },
        (dispatch) => {
            //merge actions
            let actions = { pushState }
            Object.assign(actions, BasicChildActions)
            return bindActionCreators(actions, dispatch)
        })(BasicChild),
     
     /* bind BasicChild */
    ListDetailParent: connect(
        (state) => {
            return {
                selectedId: state.listDetailParent.selectedId,
                items: state.listDetailParent.items
            }
        },
        (dispatch) => {
            //merge actions
            let actions = { pushState }
            Object.assign(actions, ListDetailParentActions)
            return bindActionCreators(actions, dispatch)
        })(ListDetailParent),
}
//====== create store functions ======
export function CreateServerStore(initialState: any, isDevelopment: boolean) {
    var reducer = {
        basicParent: BasicParentReducer,
        basicChild: BasicChildReducer,
        listDetailParent: ListDetailParentReducer,
    };
    //create store
    let store = StoreFactory.RouterAppServerDefault(getRoutes(), reducer, initialState, isDevelopment);
    return store;
}
export function CreateClientStore(initialState: any, isDevelopment: boolean) {

    var reducer = {
        basicParent: BasicParentReducer,
        basicChild: BasicChildReducer,
        listDetailParent: ListDetailParentReducer,
    };
    //create store
    let store = StoreFactory.RouterAppClientDefault(reducer, initialState, isDevelopment);
    return store;
}

//====== app component ======
export function getRoutes() {
    return (<Route path="/" component={components.AppContainer} >
                <Route path="basic/parent" component={components.BasicParent}>
                        <Route path="child" component={components.BasicChild} />
                        <Route path="child/:id" component={components.BasicChild} />
                    </Route>
                { /* Catch all route */ }
                <Route path="list" component={components.ListDetailParent}>
                    </Route>
                <Route path="*" component={UrlUnMatch} status={404} />
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
