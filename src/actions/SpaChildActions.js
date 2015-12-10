"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeMessage = changeMessage;
//types
var SpaChildActionTypes = exports.SpaChildActionTypes = {
    CHANGE_MESSAGE: "CHILD.CHANGE_MESSAGE"
};
//creators
function changeMessage(message) {
    return {
        type: SpaChildActionTypes.CHANGE_MESSAGE,
        message: message
    };
}
;