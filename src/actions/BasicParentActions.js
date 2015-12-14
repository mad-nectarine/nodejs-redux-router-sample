"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeMessage = changeMessage;
//types
var BasicParentActionTypes = exports.BasicParentActionTypes = {
    CHANGE_MESSAGE: "BASIC_PARENT.CHANGE_MESSAGE"
};
//creators
function changeMessage(message) {
    return {
        type: BasicParentActionTypes.CHANGE_MESSAGE,
        message: message
    };
}