import * as React from 'react'
// == import application modules ==
import * as ListDetailActions from '../../actions/ListDetailActions'
import MessageArea from './MessageArea'

export interface ListDetailChildProps extends ListDetailActions.ListDetailActionApi {
	items: Array<{ id: string, name: string }>,
	selectedId: string,
	message: { type: string, text: string},
	mode: string,
	inputItem : { id:string, name:string }
	children?
}
export default class ListDetailChild extends React.Component<ListDetailChildProps, any> {

	render() {		
		//get values from props
		const {
			mode,
			inputItem
		} = this.props

		return (
			<section>
				<h2>Detail</h2>
				<section>
					<div className="input-form">
						<p>
							<label>ID</label>
							{ this._getIdDom.bind(this)(inputItem, mode) }
							</p>
						<p>
							<label>Name</label>
							{this._getNameDom.bind(this)(inputItem, mode)}
							</p>
							</div>
					<div className="operations">
						{this._getSubmitDom.bind(this)(mode)}
						</div>
					</section>
				</section>
		)
	}
	
	private _handleChangeInputValue(event){
		let id = (this.refs["id"] as any).value as string 
		let name = (this.refs["name"] as any).value as string
		this.props.changeInput({ id, name })
	}
	
	private _handleSubmitClick(mode:string, event){
		let id = (this.refs["id"] as any).value as string 
		let name = (this.refs["name"] as any).value as string
		 	
		switch (mode) {
			case "add":
				this.props.add({ id, name })
				break;
			case "update":
				this.props.update({ id, name })
				break;
			case "remove":
				this.props.remove(id)
				break;
			default:
				break;
		}
	}
	
	private _getIdDom(item: {id:string,name:string}, mode:string ){
		let canInput = mode == "add"
		let id = item ? item.id : ""
		if(canInput){
			return (<input type="text" value={id} ref="id" onChange={this._handleChangeInputValue.bind(this)} />)	
		}
		return (<input type="text" value={id} ref="id" disabled={true} />)
	}
	private _getNameDom(item: {id:string,name:string}, mode:string ){
		let canInput = mode == "add" || mode == "update"
		let name = item ? item.name : ""
		if(canInput){
			return (<input type="text" value={name}  ref="name"onChange={this._handleChangeInputValue.bind(this)} />)	
		}
		return (<input type="text" value={name} ref="name" disabled={true} />)
	}
	private _getSubmitDom(mode:string ) {
		switch (mode) {
			case "add":
			case "update":
			case "remove":
				let click = (e) => { this._handleSubmitClick(mode,e) }
				return (<input type="button" value={mode} onClick={click.bind(this)} />)
			default:
				break
		}
		return null
	}
}