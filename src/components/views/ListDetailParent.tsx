import * as React from 'react'
// == import application modules ==
import * as ListDetailParentActions from '../../actions/ListDetailParentActions'

export interface ListDetailParentProps extends ListDetailParentActions.ListDetailParentActionApi {
	items: Array<{ id: string, name: string }>,
	selectedId: string,
	children?
}
export default class ListDetailParent extends React.Component<ListDetailParentProps, any> {

	handleSelect(item, event) {
		if(item){
			this.props.select(item.id)	
		}
	}
	render() {
		
		//get values from props
		const {
			items,
			selectedId
		} = this.props
		
		let itemsDom = null;
		if(items){
			itemsDom = items.map((item) =>{
				let isSelected = item.id == selectedId
				let className = isSelected ? "selected" : ""
				let click = this.handleSelect.bind(this,item)
				return (
					<li className={className} key={item.id} onClick={click}>		
						{item.name}
					</li>
				)})
		}
		
		return (
			<section>
				<h2>List</h2>
				<section>
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