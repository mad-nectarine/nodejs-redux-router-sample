//types
export const SpaContainerActionTypes = {
	CHANGE_MESSAGE: "SPA.CHANGE_MESSAGE"
}

//api interface
export interface SpaContainerActionApi {
	changeMessage?: { (message: string): void }
}

//creators
export function changeMessage(message: string) {
	return { 
		type: SpaContainerActionTypes.CHANGE_MESSAGE, 
		message 
	}
};
