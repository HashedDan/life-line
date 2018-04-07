import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import AppBar from 'material-ui/AppBar'

import UserMenu from '../UserMenu';
import * as routes from '../../constants/routes';

const Navigation = (props, { authUser }) =>
  <div>
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
    <AppBar
      title="Life Line"
      iconElementRight={<UserMenu  email={props.authUser.email}/>}
      style={{backgroundColor: "#ff0000"}}
      showMenuIconButton={false}
    />
  </div>

const NavigationNonAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </ul>

export default Navigation;
