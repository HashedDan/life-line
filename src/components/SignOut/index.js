import React from 'react';
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'

import { auth } from '../../firebase';

const SignOutButton = (props) =>
  
  <FlatButton
    label={props.email}
    hoverColor="#ff7f7f"
    labelStyle={{color: "white"}}
    icon={<FontIcon className="muidocs-icon-account-circle" />}
    onClick={auth.doSignOut}
  />

export default SignOutButton;
