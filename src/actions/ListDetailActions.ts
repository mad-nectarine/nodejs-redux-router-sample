import * as superagent from 'superagent'
import thunk from 'redux-thunk'

//state connector
import ActionStateConnector from '../util/ActionStateConnector'
export const StateConnector = ActionStateConnector()

//types
export const ListDetailActionTypes = {
	SELECT: "LISTDETAIL.SELECT",
	ADD: "LISTDETAIL.ADD",
	REMOVE: "LISTDETAIL.REMOVE",
	UPDATE: "LISTDETAIL.UPDATE",
	LOAD_LIST: "LISTDETAIL.LOAD_LIST",
	CHANGE_MODE: "LISTDETAIL.CHANGE_MODE",
	CHANGE_MESSAGE: "LISTDETAIL.CHANGE_MESSAGE",
	CHANGE_INPUT: "LISTDETAIL.CHANGE_INPUT",
}

//api interface
export interface ListDetailActionApi {
	select?: { (id: string): void }
	add?: { (item: { id: string, name: string }): void }
	update?: { (item: { id: string, name: string }): void }
	remove?: { (id: string): void }
	loadList?: { (): void }
	changeMode: { (mode: string): void }
	changeMessage: { (message: { type: string, text: string }): void }
	changeInput: { (input: { id: string, name: string }): void }
}

//creators
export function select(id: string) {
	return (dispatch, getState) => {
		dispatch(changeMode(""))
		let state = StateConnector.getOrOriginal(getState)
		let items = state.items as Array<{id :string,name: string}>
		let filtered = items.filter(x => x.id == id)
		let selectedItem = filtered.length > 0 ? filtered[0] : null 
		dispatch({ type: ListDetailActionTypes.SELECT , id })
		dispatch(changeInput(selectedItem))
	}
}
export function add(item: { id: string, name: string }) {
	return (dispatch, getState) => {
		dispatch(changeMessage(null))
		superagent.post("/data/add")
			.send({ item })
			.end((err, res) => {
				if (err) {
					dispatch(changeMessage({ type: "error", text: err }))
					return
				}
				let result = JSON.parse(res.text)
				if (result.isSuccess) {
					dispatch({
						type: ListDetailActionTypes.ADD,
						item
					})
					dispatch(changeMessage({ type: "info", text: "save completed" }))
					dispatch(select(item.id))
					return
				}
				dispatch(changeMessage({ type: "error", text: result.message }))
			})
	}
}
export function update(item: { id: string, name: string }) {
	return (dispatch, getState) => {
		dispatch(changeMessage(null))
		superagent.post("/data/update")
			.send({ item })
			.end((err, res) => {
				if (err) {
					dispatch(changeMessage({ type: "error", text: err }))
					return
				}
				let result = JSON.parse(res.text)
				if (result.isSuccess) {
					dispatch({
						type: ListDetailActionTypes.UPDATE,
						item
					})
					dispatch(changeMessage({ type: "info", text: "save completed" }))
					dispatch(select(item.id))
					return
				}
				dispatch(changeMessage({ type: "error", text: result.message }))
			})
	}
}
export function remove(id: string) {
	return (dispatch, getState) => {
		dispatch(changeMessage(null))
		superagent.post("/data/remove")
			.send({ id })
			.end((err, res) => {
				if (err) {
					dispatch(changeMessage({ type: "error", text: err }))
					return
				}
				let result = JSON.parse(res.text)
				if (result.isSuccess) {
					dispatch({
						type: ListDetailActionTypes.REMOVE,
						id
					})
					dispatch(changeMessage({ type: "info", text: "save completed" }))
					dispatch(select(id))
					return
				}
				dispatch(changeMessage({ type: "error", text: result.message }))
			})
	}
}

export function loadList() {
	return (dispatch, getState) => {
		dispatch(changeMode(""))
		dispatch(changeMessage(null))

		superagent.get("/data/list", (err, res) => {
			if (err) {
				dispatch(changeMessage({ type: "error", text: err }))
				return
			}
			dispatch(select(""))
			dispatch({
				type: ListDetailActionTypes.LOAD_LIST,
				items: JSON.parse(res.text).items
			})
		})
	}
}

export function changeMode(mode: string) {
	return (dispatch, getState) => {
		if(mode == "add"){
			dispatch(select(""))	
		}
		dispatch({
			type: ListDetailActionTypes.CHANGE_MODE,
			mode
		})
	}
}

export function changeMessage(message: { type: string, text: string }) {
	return {
		type: ListDetailActionTypes.CHANGE_MESSAGE,
		message
	}
}

export function changeInput(input: { id: string, name: string }) {
	return {
		type: ListDetailActionTypes.CHANGE_INPUT,
		input
	}
}