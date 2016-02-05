// == import installed modules ==
import * as React from 'react'
import { Link } from 'react-router';
// == import application modules ==
import MessageArea from './MessageArea'


export interface AppContainerProps {
  pushState?
  children?
}

export class AppContainer extends React.Component<AppContainerProps, any> {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.pushState(null, '/app/basic/parent/child/custom');
    
    //if not connect actions to props
    // const { dispatch } = this.props;
    // dispatch(pushState(null, '/parent/child/custom'));
  }

  render() {
    return (
      <div>
        <h1>App Container</h1>
        <div className="side-contents">
          <ul className="links list">
            <li className="unselectable">
              <p>Basic</p>
              <ul>
                <li><Link to="/app/basic/parent">/parent</Link></li>
                <li><Link to="/app/basic/parent/child">/parent/child</Link></li>
                <li><Link to="/app/basic/parent/child/123">/parent/child/123</Link></li>
                <li><a href="#" onClick={this.handleClick}>/parent/child/custom(click) </a></li>
                </ul>
              </li>
            <li className="unselectable">
              <p>List-Detail</p>
              <ul>
                <li><Link to="/app/list">/</Link></li>
                <li><Link to="/app/list/detail">/detail</Link></li>
                </ul>
              </li>
            <li className="unselectable">
              <p>Authentication</p>
              <ul>
                <li><Link to="/app/auth/login">{"/login"}</Link></li>
                <li><Link to="/app/auth/needAuth">/needAuth</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        <div className="main-contents">
          <section>
            {this.props.children}
            </section>
          </div>
        </div>
    )
  }
}
export default AppContainer