import * as Redux from 'redux';
import { ListDetailParentActionTypes } from '../actions/ListDetailParentActions';
function _getinitialItems() {
	return [
		{ id: "0001", name: "item-0001" },
		{ id: "0002", name: "item-0002" },
		{ id: "0003", name: "item-0003" },
		{ id: "0004", name: "item-0004" },
		{ id: "0005", name: "item-0005" },
	]
}

//reducer
function selectedId(state: string = "", action) {
	switch (action.type) {
		case ListDetailParentActionTypes.SELECT:
			return action.id
		default:
			return state
	}
}

function items(state: Array<{ id: string, name: string }> = _getinitialItems(), action) {
	switch (action.type) {
		case ListDetailParentActionTypes.ADD:
			let items = []
			items.concat(state)
			items.push(action.item)
			return items;
		case ListDetailParentActionTypes.UPDATE:
			return state.map(x => {
				if (x.id == action.item.id) {
					return action.item;
				}
				return x
			})
		case ListDetailParentActionTypes.REMOVE:
			return state.filter(x => {
				return x.id != action.id
			})
		case ListDetailParentActionTypes.RELOAD:
			return _getinitialItems()
		default:
			return state
	}
}

export const Reducer = Redux.combineReducers({ selectedId, items });
export default Reducer;