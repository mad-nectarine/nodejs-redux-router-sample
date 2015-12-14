"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeMessage = changeMessage;
//types
var BasicChildActionTypes = exports.BasicChildActionTypes = {
    CHANGE_MESSAGE: "BASIC_CHILD.CHANGE_MESSAGE"
};
//creators
function changeMessage(message) {
    return {
        type: BasicChildActionTypes.CHANGE_MESSAGE,
        message: message
    };
}