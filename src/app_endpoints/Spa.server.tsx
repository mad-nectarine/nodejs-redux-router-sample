import * as React from 'react';
import ReduxFullPageLayout from '../components/layouts/ReduxFullPageLayout'
import * as App from '../apps/SpaApp'

export interface SpaProps {
	title: string,
	store: any
}

export default class Spa extends React.Component<SpaProps, any>
{	
	render() { 
		// let initialState = {
		// 	app: { message:"init" }
		// };
		//let isDevelopment = process.env.NODE_ENV == "development";
		//let store = App.CreateServerStore(initialState, isDevelopment);
		
		return (
		<ReduxFullPageLayout
			title={this.props.title}
			pageName="spa"
			store={this.props.store}
			isDevelopment={true}>
			<App.SpaApp title={this.props.title} />
			</ReduxFullPageLayout>);
	}
}

module.exports = Spa;