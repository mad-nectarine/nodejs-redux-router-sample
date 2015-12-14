// == import installed modules ==
import * as React from 'react'
// == import application modules ==
import * as BasicChildActions from '../../actions/BasicChildActions'
import MessageArea from './MessageArea'

export interface BasicChildProps extends BasicChildActions.BasicChildActionApi {
  message?: string,
  parentMessage?: string
  params?: { id: string }
}

export default class BasicChild extends React.Component<BasicChildProps, any> {
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
      parentMessage,
      params: { id }, //from url by router
    } = this.props;
    
    //create elements
    let parentMessageProps = parentMessage ?
      { type: "info", text: "id:" + parentMessage } :
      { type: "error", text: "no parent message" }
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
          <h1>From Parent</h1>
          <p>
            <MessageArea message={parentMessageProps} />
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