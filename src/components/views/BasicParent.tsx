import * as React from 'react'
// == import application modules ==
import * as BasicParentActions from '../../actions/BasicParentActions'
import MessageArea from './MessageArea'

export interface BasicParentProps extends BasicParentActions.BasicParentActionApi {
	message?: string,
	children?
}
export default class BasicParent extends React.Component<BasicParentProps, any> {
	constructor(props) {
		super(props)
		this.handleChangeClick = this.handleChangeClick.bind(this)
	}
	handleChangeClick(event) {
		event.preventDefault();
		this.props.changeMessage((this.refs["message"] as React.HTMLAttributes).value as string)
		
		//if not connect actions to props
		// const { dispatch } = this.props
		//dispatch(IndexActions.changeMessage({ text: "test", type: "error" }))
	}
	render() {
		
		//get values from props
		const {
		message
		} = this.props
    
		//create elements
		let messageProps = message ?
		{ type: "info", text: message } :
		{ type: "error", text: "no message" }
		
		return (
			<section>
				<h2>Parent</h2>
				<section>
					<div className="input-form">
						<h1>Message</h1>
						<p>
							<input type="text" ref="message" />
							<input type="button" value="Change" onClick={this.handleChangeClick} />
							</p>
						<p>
							<MessageArea message={messageProps} />
							</p>
						</div>
					</section>
				{this.props.children}
				</section>
		)
	}
}