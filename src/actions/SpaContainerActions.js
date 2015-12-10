"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeMessage = changeMessage;
//types
var SpaContainerActionTypes = exports.SpaContainerActionTypes = {
    CHANGE_MESSAGE: "SPA.CHANGE_MESSAGE"
};
//creators
function changeMessage(message) {
    return {
        type: SpaContainerActionTypes.CHANGE_MESSAGE,
        message: message
    };
}
;