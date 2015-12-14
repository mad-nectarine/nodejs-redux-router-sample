//types
export const BasicParentActionTypes = {
	CHANGE_MESSAGE: "BASIC_PARENT.CHANGE_MESSAGE"
}

//api interface
export interface BasicParentActionApi {
	changeMessage?: { (message: string): void }
}

//creators
export function changeMessage(message: string) {
	return { 
		type: BasicParentActionTypes.CHANGE_MESSAGE, 
		message 
	}
}

