import { combineReducers } from 'redux';
import { BasicChildActionTypes } from '../actions/BasicChildActions';

//reducer
function message(state: string = "", action) {
    switch (action.type) {
        case BasicChildActionTypes.CHANGE_MESSAGE:
            return action.message
        default:
            return state
    }
}
export const Reducer = combineReducers({ message });
export default Reducer;