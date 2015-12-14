//types
export const ListDetailParentActionTypes = {
	SELECT: "LISTDETAIL_PARENT.SELECT",
	ADD: "LISTDETAIL_PARENT.ADD",
	REMOVE: "LISTDETAIL_PARENT.REMOVE",
	UPDATE: "LISTDETAIL_PARENT.UPDATE",
	RELOAD: "LISTDETAIL_PARENT.RELOAD"
}

//api interface
export interface ListDetailParentActionApi {
	select?: { (id: string): void }
	add?: { (item: { id: string, name: string }): void }
	update?: { (item: { id: string, name: string }): void }
	remove?: { (id: string): void }
	reload?: { (): void }
}

//creators
export function select(id: string) {
	return {
		type: ListDetailParentActionTypes.SELECT,
		id
	}
}
export function add(item: { id: string, name: string }) {
	return {
		type: ListDetailParentActionTypes.ADD,
		item
	}
}
export function remove(id: string) {
	return {
		type: ListDetailParentActionTypes.REMOVE,
		id
	}
}
export function update(item: { id: string, name: string }) {
	return {
		type: ListDetailParentActionTypes.UPDATE,
		item
	}
}
export function reload() {
	return {
		type: ListDetailParentActionTypes.RELOAD
	}
}

