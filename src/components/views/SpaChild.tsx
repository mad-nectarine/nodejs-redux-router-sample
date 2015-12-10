// == import installed modules ==
import * as React from 'react'
import { Link } from 'react-router';
// == import application modules ==
import * as SpaChildActions from '../../actions/SpaChildActions'
import MessageArea from './MessageArea'

export interface SpaChildProps extends SpaChildActions.SpaChildActionApi {
  message?: string,
  containerMessage?: string
  params?: { id: string }
}

export default class SpaChild extends React.Component<SpaChildProps, any> {
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
      containerMessage,
      params: { id }, //from url by router
    } = this.props;
    
    //create elements
    let idDom = null;
    let msgDom = null;
    if (id) {
      idDom = id;
    }
    if (containerMessage) {
      msgDom = containerMessage;
    }
    let message = this.props.message ? { type: "info", text: this.props.message } : { type: "none", text: "" };

    return (
      <section>
        <h1>Child</h1>
        <section>
          <h1>From Container</h1>
          <p>Container Message: {msgDom}</p>
          </section>
        <section>
          <h1>From Url Params</h1>
          <p>ID: {idDom} (from url params) </p>
          </section>
        <section>
          <h1>Child State</h1>
          <div className="input-form">
              <h1>Message</h1>
              <p>
                <input type="text" ref="message" />
                <input type="button" value="Change" onClick={this.handleChangeClick} />
                </p>
              <p>
                <MessageArea message={message} />
                </p>
            </div>
          </section>
        </section>
    );
  }
}