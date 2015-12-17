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
import * as ActionStateConnector from '../util/ActionStateConnector'
//Basic
import BasicParent from '../components/views/BasicParent'
import * as BasicParentActions from '../actions/BasicParentActions'
import BasicParentReducer from '../reducers/BasicParentReducer'
import BasicChild from '../components/views/BasicChild'
import * as BasicChildActions from '../actions/BasicChildActions'
import BasicChildReducer from '../reducers/BasicChildReducer'
//ListDetail
import ListDetailParent from '../components/views/ListDetailParent'
import ListDetailChild from '../components/views/ListDetailChild'
import * as ListDetailActions from '../actions/ListDetailActions'
import ListDetailReducer from '../reducers/ListDetailReducer'


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
     
     /* bind ListDetailParent */
    ListDetailParent: connect(
        (state) => {
            return {
                selectedId: state.listDetail.selectedId,
                items: state.listDetail.items,
                message: state.listDetail.message,
                mode: state.listDetail.mode,
                inputItem: state.listDetail.inputItem
            }
        },
        (dispatch) => {
            //merge actions
            let actions = { pushState }
            Object.assign(actions, ListDetailActions)
            return bindActionCreators(actions, dispatch)
        })(ListDetailParent),
        
     /* bind ListDetailChild */
    ListDetailChild: connect(
        (state) => {
            return {
                selectedId: state.listDetail.selectedId,
                items: state.listDetail.items,
                message: state.listDetail.message,
                mode: state.listDetail.mode,
                inputItem: state.listDetail.inputItem
            }
        },
        (dispatch) => {
            //merge actions
            let actions = { pushState }
            Object.assign(actions, ListDetailActions)
            return bindActionCreators(actions, dispatch)
        })(ListDetailChild),
}
//====== connect action and state ======
//ListDetailActions.StateConnector.connect("listDetail")
ListDetailActions.StateConnector.connect((state)=>{
    return state.listDetail
})

//====== create store functions ======
export function CreateServerStore(initialState: any, isDevelopment: boolean) {
    var reducer = {
        basicParent: BasicParentReducer,
        basicChild: BasicChildReducer,
        listDetail: ListDetailReducer,
    };
    //create store
    let store = StoreFactory.RouterAppServerDefault(getRoutes(), reducer, initialState, isDevelopment);
    return store;
}
export function CreateClientStore(initialState: any, isDevelopment: boolean) {

    var reducer = {
        basicParent: BasicParentReducer,
        basicChild: BasicChildReducer,
        listDetail: ListDetailReducer,
    };
    //create store
    let store = StoreFactory.RouterAppClientDefault(reducer, initialState, isDevelopment);
    return store;
}

//====== app component ======
export function getRoutes() {
    return (<Route path="app" component={components.AppContainer} >
                { /* Basic */ }
                <Route path="basic/parent" component={components.BasicParent}>
                        <Route path="child" component={components.BasicChild} />
                        <Route path="child/:id" component={components.BasicChild} />
                    </Route>
                { /* List & Detail */ }
                <Route path="list" component={components.ListDetailParent}>
                    <Route path="detail" component={components.ListDetailChild} />
                    </Route>
                { /* Authentication */ }
                { /* Catch all route */ }
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
