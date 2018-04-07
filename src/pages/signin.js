import React from 'react';

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SignInForm from '../components/SignIn';
import { SignUpLink } from '../components/SignUp';
import { PasswordForgetLink } from '../components/PasswordForget';

const SignInPage = () =>
  <div style={{width: '100%', textAlign: 'center'}}>
    <Card style={{maxWidth: '50vw', minWidth: '300px', display: 'inline-block'}}>
      <CardTitle title="Sign In" subtitle="Enter your username and password to access your Life Line account." />
      <CardText>
        <SignInForm />
      </CardText>
      <CardActions>
        {/* <FlatButton label="Action1" />
        <FlatButton label="Action2" /> */}
        <PasswordForgetLink />
        <SignUpLink />
      </CardActions>
    </Card>


  </div>

export default SignInPage;