import * as React from 'react';
import ReduxFullPageLayout from '../components/layouts/ReduxFullPageLayout'
import * as App from '../apps/SpaApp'

export interface SpaProps {
	title: string,
	store: any,
	isDevelopment: boolean
}

export default class Spa extends React.Component<SpaProps, any>
{	
	render() { 
		return (
		<ReduxFullPageLayout
			title={this.props.title}
			pageName="spa"
			store={this.props.store}
			isDevelopment={this.props.isDevelopment}>
			<App.SpaApp title={this.props.title} />
			</ReduxFullPageLayout>);
	}
}

module.exports = Spa;