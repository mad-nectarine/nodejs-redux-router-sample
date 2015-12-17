'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ListDetailActionTypes = exports.StateConnector = undefined;
exports.select = select;
exports.add = add;
exports.update = update;
exports.remove = remove;
exports.loadList = loadList;
exports.changeMode = changeMode;
exports.changeMessage = changeMessage;
exports.changeInput = changeInput;

var _superagent = require('superagent');

var superagent = _interopRequireWildcard(_superagent);

var _ActionStateConnector = require('../util/ActionStateConnector');

var _ActionStateConnector2 = _interopRequireDefault(_ActionStateConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var StateConnector = exports.StateConnector = (0, _ActionStateConnector2.default)();
//types
var ListDetailActionTypes = exports.ListDetailActionTypes = {
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
        var state = StateConnector.getOrOriginal(getState);
        var items = state.items;
        var filtered = items.filter(function (x) {
            return x.id == id;
        });
        var selectedItem = filtered.length > 0 ? filtered[0] : null;
        dispatch({ type: ListDetailActionTypes.SELECT, id: id });
        dispatch(changeInput(selectedItem));
    };
}
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
                    type: ListDetailActionTypes.ADD,
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
                    type: ListDetailActionTypes.UPDATE,
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
                    type: ListDetailActionTypes.REMOVE,
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
                type: ListDetailActionTypes.LOAD_LIST,
                items: JSON.parse(res.text).items
            });
        });
    };
}
function changeMode(mode) {
    return function (dispatch, getState) {
        if (mode == "add") {
            dispatch(select(""));
        }
        dispatch({
            type: ListDetailActionTypes.CHANGE_MODE,
            mode: mode
        });
    };
}
function changeMessage(message) {
    return {
        type: ListDetailActionTypes.CHANGE_MESSAGE,
        message: message
    };
}
function changeInput(input) {
    return {
        type: ListDetailActionTypes.CHANGE_INPUT,
        input: input
    };
}