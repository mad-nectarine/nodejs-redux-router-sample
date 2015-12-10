import * as Redux from 'redux';
import { SpaChildActionTypes } from '../actions/SpaChildActions';

//reducer
function message(state:string = "", action){
	switch (action.type) {
		case SpaChildActionTypes.CHANGE_MESSAGE:
			return action.message
		default:
			return state
	}
}
export const Reducer = Redux.combineReducers({ message });
export default Reducer;