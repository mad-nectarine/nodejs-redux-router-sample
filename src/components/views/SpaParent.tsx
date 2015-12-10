import * as React from 'react'

export interface SpaParentProps {
	children?
}
export default class SpaParent extends React.Component<SpaParentProps, any> {
	render() {
		return (
			<section>
				<h2>Parent</h2>
				{this.props.children}
				</section>
		);
	}
}