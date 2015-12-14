//types
export const BasicChildActionTypes = {
	CHANGE_MESSAGE: "BASIC_CHILD.CHANGE_MESSAGE"
}

//api interface
export interface BasicChildActionApi {
	changeMessage?: { (message: string): void }
}

//creators
export function changeMessage(message: string) {
	return { 
		type: BasicChildActionTypes.CHANGE_MESSAGE, 
		message 
	}
}

