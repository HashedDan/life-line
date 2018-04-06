import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import AppBar from 'material-ui/AppBar'

import SignOutButton from '../SignOut';
import * as routes from '../../constants/routes';

const Navigation = (props, { authUser }) =>
  <div>
    {console.log(authUser)}
    {authUser
      ? <NavigationAuth authUser={authUser} />
      : <NavigationNonAuth />
    }
  </div>

Navigation.contextTypes = {
  authUser: PropTypes.object,
};

const NavigationAuth = (props) =>
  <div>
    {console.log(props.authUser.email)}
    <AppBar
      title="Life Line"
      iconElementRight={<SignOutButton email={props.authUser.email}/>}
      style={{backgroundColor: "#ff0000"}}
      showMenuIconButton={false}
    />
    <ul>
      <li><Link to={routes.LANDING}>Landing</Link></li>
      <li><Link to={routes.HOME}>Home</Link></li>
      <li><Link to={routes.ACCOUNT}>Account</Link></li>
      <li><SignOutButton /></li>
    </ul>
  </div>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

export default Navigation;
