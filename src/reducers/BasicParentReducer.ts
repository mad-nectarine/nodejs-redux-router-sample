import * as Redux from 'redux';
import { BasicParentActionTypes } from '../actions/BasicParentActions';

//reducer
function message(state:string = "", action){
	switch (action.type) {
		case BasicParentActionTypes.CHANGE_MESSAGE:
			return action.message
		default:
			return state
	}
}
export const Reducer = Redux.combineReducers({ message });
export default Reducer;