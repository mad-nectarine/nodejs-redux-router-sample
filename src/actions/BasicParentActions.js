"use strict";

//types
exports.BasicParentActionTypes = {
    CHANGE_MESSAGE: "BASIC_PARENT.CHANGE_MESSAGE"
};
//creators
function changeMessage(message) {
    return {
        type: exports.BasicParentActionTypes.CHANGE_MESSAGE,
        message: message
    };
}
exports.changeMessage = changeMessage;