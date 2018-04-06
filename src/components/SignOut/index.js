import React from 'react';
import FlatButton from 'material-ui/FlatButton'

import { auth } from '../../firebase';

const SignOutButton = (props) =>
  
  <FlatButton
    label={props.email}
    hoverColor="#ff7f7f"
    labelStyle={{color: "white"}}
    onClick={auth.doSignOut}
  />

export default SignOutButton;
