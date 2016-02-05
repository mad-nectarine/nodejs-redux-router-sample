'use strict';

// == import installed modules ==
var React = require('react');
var react_router_1 = require('react-router');
var react_redux_1 = require('react-redux');
var AppContainer_1 = require('../components/views/AppContainer');
var BasicParentReducer_1 = require('../reducers/BasicParentReducer');
var BasicChildReducer_1 = require('../reducers/BasicChildReducer');
var ListDetailReducer_1 = require('../reducers/ListDetailReducer');
var components = {
    /* bind AppContainer */
    AppContainer: react_redux_1.connect(function (state) {
        return {};
    })(AppContainer_1.default)
};
//====== bind state and action to components props ======
// var components = {
//     /* bind AppContainer */
//     AppContainer: connect(
//         (state) => {
//             return {}
//         },
//         (dispatch) => {
//             //return bindActionCreators({ pushState }, dispatch)
//         }
//     )(AppContainer),
//     /* bind BasicParent */
//     BasicParent: connect(
//         (state) => {
//             return {
//                 message: state.basicParent.message
//             }
//         },
//         (dispatch) => {
//             //merge actions
//             // let actions = {
//             //     //pushState //"pushState" is a function,so you must set as a property. 
//             // }
//             // Object.assign(actions, BasicParentActions)
//             //you can merge more actions
//             //Object.assign(actions, hogeActionCreator, fugaActionCreator);
//             //bind actions to dispatcher
//             //return bindActionCreators(actions, dispatch)
//         })(BasicParent),
//     /* bind BasicChild */
//     BasicChild: connect(
//         (state) => {
//             return {
//                 message: state.basicChild.message,
//                 parentMessage: state.basicParent.message
//             }
//         },
//         (dispatch) => {
//             //merge actions
//             // let actions = { pushState }
//             // Object.assign(actions, BasicChildActions)
//             // return bindActionCreators(actions, dispatch)
//         })(BasicChild),
//      /* bind ListDetailParent */
//     ListDetailParent: connect(
//         (state) => {
//             return {
//                 selectedId: state.listDetail.selectedId,
//                 items: state.listDetail.items,
//                 message: state.listDetail.message,
//                 mode: state.listDetail.mode,
//                 inputItem: state.listDetail.inputItem
//             }
//         },
//         (dispatch) => {
//             //merge actions
//             // let actions = { pushState }
//             // Object.assign(actions, ListDetailActions)
//             // return bindActionCreators(actions, dispatch)
//         })(ListDetailParent),
//      /* bind ListDetailChild */
//     ListDetailChild: connect(
//         (state) => {
//             return {
//                 selectedId: state.listDetail.selectedId,
//                 items: state.listDetail.items,
//                 message: state.listDetail.message,
//                 mode: state.listDetail.mode,
//                 inputItem: state.listDetail.inputItem
//             }
//         },
//         (dispatch) => {
//             //merge actions
//             // let actions = { pushState }
//             // Object.assign(actions, ListDetailActions)
//             // return bindActionCreators(actions, dispatch)
//         })(ListDetailChild),
// }
// //====== connect action and state ======
// //ListDetailActions.StateConnector.connect("listDetail")
// // ListDetailActions.StateConnector.connect((state)=>{
// //     return state.listDetail
// // })
function getReducers() {
    return {
        basicParent: BasicParentReducer_1.default,
        basicChild: BasicChildReducer_1.default,
        listDetail: ListDetailReducer_1.default
    };
}
exports.getReducers = getReducers;
//====== app component ======
function getRoutes(baseUrl) {
    baseUrl = baseUrl || "/";
    return React.createElement(react_router_1.Route, { "path": baseUrl, "component": components.AppContainer });
}
exports.getRoutes = getRoutes;