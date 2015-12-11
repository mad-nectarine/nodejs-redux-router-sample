// == import installed modules ==
import * as React from 'react'
import { Link } from 'react-router';
// == import application modules ==
import * as SpaContainerActions from '../../actions/SpaContainerActions'
import MessageArea from './MessageArea'


export interface SpaContainerProps extends SpaContainerActions.SpaContainerActionApi {
  message?: string
  pushState?
  children?
}

export default class SpaContainer extends React.Component<SpaContainerProps, any> {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeClick = this.handleChangeClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.pushState(null, '/parent/child/custom');
    
    //if not connect actions to props
    // const { dispatch } = this.props;
    // dispatch(pushState(null, '/parent/child/custom'));
  }
  handleChangeClick(event) {
    event.preventDefault();
    this.props.changeMessage((this.refs["message"] as React.HTMLAttributes).value as string);
    
    //if not connect actions to props
    // const { dispatch } = this.props;
    //dispatch(IndexActions.changeMessage({ text: "test", type: "error" }));
  }

  render() {
    const links = [
      '/',
      '/parent?foo=bar',
      '/parent/child?bar=baz',
      '/parent/child/123?baz=foo'
    ].map((l,index) =>
      <li><Link to={l} key={index}>{l}</Link></li>
      );
      
    let message = this.props.message ? { type: "info", text: this.props.message } : { type: "error", text: "no message" };

    return (
      <div>
        <h1>App Container</h1>
        <div className="side-contents">
          <ul className="links list">
            {links}
            <li>
              <a href="#" onClick={this.handleClick}>/parent/child/custom</a>
              </li>
            </ul>
          </div>
        <div className="main-contents">
          <section>
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
          <section>
            {this.props.children}
            </section>
          </div>
        </div>
    )
  }
}