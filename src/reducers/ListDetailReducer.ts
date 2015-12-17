import * as Redux from 'redux';
import { ListDetailActionTypes } from '../actions/ListDetailActions';

//reducer
function selectedId(state: string = "", action) {
	switch (action.type) {
		case ListDetailActionTypes.SELECT:
			return action.id
		default:
			return state
	}
}

function items(state: Array<{ id: string, name: string }> = [], action) {
	switch (action.type) {
		case ListDetailActionTypes.ADD:
			let items = []
			items = items.concat(state)
			items.push(action.item)
			return items;
		case ListDetailActionTypes.UPDATE:
			return state.map(x => {
				if (x.id == action.item.id) {
					return action.item;
				}
				return x
			})
		case ListDetailActionTypes.REMOVE:
			return state.filter(x => {
				return x.id != action.id
			})
		case ListDetailActionTypes.LOAD_LIST:
			return [].concat(action.items)
		default:
			return state
	}
}

function message(state : { type:string , text: string} = null, action){
	switch (action.type) {
		case ListDetailActionTypes.CHANGE_MESSAGE:
			return action.message;
		default:
			return state
	}
}

function mode(state : string = "refer", action){
	switch (action.type) {
		case ListDetailActionTypes.CHANGE_MODE:
			return action.mode;
		default:
			return state
	}
}

function inputItem(state : {id :string, name: string} = null, action){
	switch (action.type) {
		case ListDetailActionTypes.CHANGE_INPUT:
			return action.input;
		default:
			return state
	}
}

export const Reducer = Redux.combineReducers({ selectedId, items, message,mode,inputItem });
export default Reducer;