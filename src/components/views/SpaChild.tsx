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
      message,
      containerMessage,
      params: { id }, //from url by router
    } = this.props;
    
    //create elements
    let containerMessageProps = containerMessage ?
      { type: "info", text: "id:" + containerMessage } :
      { type: "error", text: "no container message" }
    let idProps = id ?
      { type: "info", text: "id:" + id } :
      { type: "error", text: "no id" }
    let messageProps = message ?
      { type: "info", text: message } :
      { type: "error", text: "no message" }

    return (
      <section>
        <h1>Child</h1>
        <section>
          <h1>From Container</h1>
          <p>
            <MessageArea message={containerMessageProps} />
            </p>
          </section>
        <section>
          <h1>From Url Params</h1>
          <p>
            <MessageArea message={idProps} />
            </p>
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
                <MessageArea message={messageProps} />
                </p>
            </div>
          </section>
        </section>
    );
  }
}