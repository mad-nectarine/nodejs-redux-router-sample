'use strict';

var superagent = require('superagent');
//state connector
var ActionStateConnector_1 = require('../util/ActionStateConnector');
exports.StateConnector = ActionStateConnector_1.default();
//types
exports.ListDetailActionTypes = {
    SELECT: "LISTDETAIL.SELECT",
    ADD: "LISTDETAIL.ADD",
    REMOVE: "LISTDETAIL.REMOVE",
    UPDATE: "LISTDETAIL.UPDATE",
    LOAD_LIST: "LISTDETAIL.LOAD_LIST",
    CHANGE_MODE: "LISTDETAIL.CHANGE_MODE",
    CHANGE_MESSAGE: "LISTDETAIL.CHANGE_MESSAGE",
    CHANGE_INPUT: "LISTDETAIL.CHANGE_INPUT"
};
//creators
function select(id) {
    return function (dispatch, getState) {
        dispatch(changeMode(""));
        var state = exports.StateConnector.getOrOriginal(getState);
        var items = state.items;
        var filtered = items.filter(function (x) {
            return x.id == id;
        });
        var selectedItem = filtered.length > 0 ? filtered[0] : null;
        dispatch({ type: exports.ListDetailActionTypes.SELECT, id: id });
        dispatch(changeInput(selectedItem));
    };
}
exports.select = select;
function add(item) {
    return function (dispatch, getState) {
        dispatch(changeMessage(null));
        superagent.post("/data/add").send({ item: item }).end(function (err, res) {
            if (err) {
                dispatch(changeMessage({ type: "error", text: err }));
                return;
            }
            var result = JSON.parse(res.text);
            if (result.isSuccess) {
                dispatch({
                    type: exports.ListDetailActionTypes.ADD,
                    item: item
                });
                dispatch(changeMessage({ type: "info", text: "save completed" }));
                dispatch(select(item.id));
                return;
            }
            dispatch(changeMessage({ type: "error", text: result.message }));
        });
    };
}
exports.add = add;
function update(item) {
    return function (dispatch, getState) {
        dispatch(changeMessage(null));
        superagent.post("/data/update").send({ item: item }).end(function (err, res) {
            if (err) {
                dispatch(changeMessage({ type: "error", text: err }));
                return;
            }
            var result = JSON.parse(res.text);
            if (result.isSuccess) {
                dispatch({
                    type: exports.ListDetailActionTypes.UPDATE,
                    item: item
                });
                dispatch(changeMessage({ type: "info", text: "save completed" }));
                dispatch(select(item.id));
                return;
            }
            dispatch(changeMessage({ type: "error", text: result.message }));
        });
    };
}
exports.update = update;
function remove(id) {
    return function (dispatch, getState) {
        dispatch(changeMessage(null));
        superagent.post("/data/remove").send({ id: id }).end(function (err, res) {
            if (err) {
                dispatch(changeMessage({ type: "error", text: err }));
                return;
            }
            var result = JSON.parse(res.text);
            if (result.isSuccess) {
                dispatch({
                    type: exports.ListDetailActionTypes.REMOVE,
                    id: id
                });
                dispatch(changeMessage({ type: "info", text: "save completed" }));
                dispatch(select(id));
                return;
            }
            dispatch(changeMessage({ type: "error", text: result.message }));
        });
    };
}
exports.remove = remove;
function loadList() {
    return function (dispatch, getState) {
        dispatch(changeMode(""));
        dispatch(changeMessage(null));
        superagent.get("/data/list", function (err, res) {
            if (err) {
                dispatch(changeMessage({ type: "error", text: err }));
                return;
            }
            dispatch(select(""));
            dispatch({
                type: exports.ListDetailActionTypes.LOAD_LIST,
                items: JSON.parse(res.text).items
            });
        });
    };
}
exports.loadList = loadList;
function changeMode(mode) {
    return function (dispatch, getState) {
        if (mode == "add") {
            dispatch(select(""));
        }
        dispatch({
            type: exports.ListDetailActionTypes.CHANGE_MODE,
            mode: mode
        });
    };
}
exports.changeMode = changeMode;
function changeMessage(message) {
    return {
        type: exports.ListDetailActionTypes.CHANGE_MESSAGE,
        message: message
    };
}
exports.changeMessage = changeMessage;
function changeInput(input) {
    return {
        type: exports.ListDetailActionTypes.CHANGE_INPUT,
        input: input
    };
}
exports.changeInput = changeInput;