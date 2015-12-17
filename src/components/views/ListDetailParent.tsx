import * as React from 'react'
// == import application modules ==
import * as ListDetailActions from '../../actions/ListDetailActions'
import MessageArea from './MessageArea'

export interface ListDetailParentProps extends ListDetailActions.ListDetailActionApi {
	items: Array<{ id: string, name: string }>,
	selectedId: string,
	message: { type: string, text: string}
	children?,
	pushState
}
export default class ListDetailParent extends React.Component<ListDetailParentProps, any> {

	handleSelect(item, event) {
		if(item){
			this.props.select(item.id)	
			this.props.pushState(null, 'detail');
		}
	}
	handleModeChange(mode:string,event) {
		this.props.changeMode(mode)
	}
	
	
	handleLoad(event) {
		this.props.loadList()
	}
	render() {
		
		//get values from props
		const {
			items,
			selectedId,
			message,
			
		} = this.props
		
		let itemsDom = null;
		let addHandler = (e) => { this.handleModeChange("add",e) }
		let updateHandler = (e) => { this.handleModeChange("update",e) }
		let removeHandler = (e) => { this.handleModeChange("remove",e) }
		let hasSelected
		if(items && items.length){
			itemsDom = items.map((item) =>{
				let isSelected = item.id == selectedId
				let className = isSelected ? "selected" : ""
				let click = this.handleSelect.bind(this,item)
				if(isSelected){
					hasSelected = true
				}
				return (
					<li className={className} key={item.id} onClick={click}>		
						{item.name}
					</li>
				)})
		}else{
			itemsDom =(
				<li>no items</li>
			)
		}
		
		
		return (
			<section>
				<h2>List</h2>
				<MessageArea message={message} />
				<section>
					<div className="operations">
						<input type="button" value="Load" onClick={this.handleLoad.bind(this)} /> 
						<input type="button" value="Add" onClick={addHandler.bind(this)} />
						<input type="button" value="Update" onClick={updateHandler.bind(this)} disabled={!hasSelected} />
						<input type="button" value="Remove" onClick={removeHandler.bind(this)} disabled={!hasSelected} />
						</div>
					<ul className="list">
					{itemsDom}
					</ul>
					</section>
				<section>
					{this.props.children}
					</section>
				</section>
		)
	}
}