import * as Redux from 'redux';
import { SpaContainerActionTypes } from '../actions/SpaContainerActions';

//reducer
function message(state:string = "", action){
	switch (action.type) {
		case SpaContainerActionTypes.CHANGE_MESSAGE:
			return action.message
		default:
			return state
	}
}
export const Reducer = Redux.combineReducers({ message });
export default Reducer;