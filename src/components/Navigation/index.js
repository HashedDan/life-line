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
      style={{backgroundColor: "#000033"}}
      showMenuIconButton={false}
    />
  </div>

const NavigationNonAuth = () =>
  <ul>
  </ul>

export default Navigation;
