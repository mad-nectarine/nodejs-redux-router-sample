//types
export const SpaChildActionTypes = {
	CHANGE_MESSAGE: "CHILD.CHANGE_MESSAGE"
}

//api interface
export interface SpaChildActionApi {
	changeMessage?: { (message: string): void }
}

//creators
export function changeMessage(message: string) {
	return { 
		type: SpaChildActionTypes.CHANGE_MESSAGE, 
		message 
	}
};
