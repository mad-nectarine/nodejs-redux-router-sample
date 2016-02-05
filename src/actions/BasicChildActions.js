"use strict";

//types
exports.BasicChildActionTypes = {
    CHANGE_MESSAGE: "BASIC_CHILD.CHANGE_MESSAGE"
};
//creators
function changeMessage(message) {
    return {
        type: exports.BasicChildActionTypes.CHANGE_MESSAGE,
        message: message
    };
}
exports.changeMessage = changeMessage;