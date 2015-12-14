"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.select = select;
exports.add = add;
exports.remove = remove;
exports.update = update;
exports.reload = reload;
//types
var ListDetailParentActionTypes = exports.ListDetailParentActionTypes = {
    SELECT: "LISTDETAIL_PARENT.SELECT",
    ADD: "LISTDETAIL_PARENT.ADD",
    REMOVE: "LISTDETAIL_PARENT.REMOVE",
    UPDATE: "LISTDETAIL_PARENT.UPDATE",
    RELOAD: "LISTDETAIL_PARENT.RELOAD"
};
//creators
function select(id) {
    return {
        type: ListDetailParentActionTypes.SELECT,
        id: id
    };
}
function add(item) {
    return {
        type: ListDetailParentActionTypes.ADD,
        item: item
    };
}
function remove(id) {
    return {
        type: ListDetailParentActionTypes.REMOVE,
        id: id
    };
}
function update(item) {
    return {
        type: ListDetailParentActionTypes.UPDATE,
        item: item
    };
}
function reload() {
    return {
        type: ListDetailParentActionTypes.RELOAD
    };
}