import React from 'react';
import Link from 'gatsby-link';

import * as routes from '../constants/routes';

const LandingPage = () =>
  <div style={{color: 'white'}}>
    <h1>Welcome to Life Line!</h1>
    <p>If you are new, sign up! Otherwise, sign in.</p>
    <li><Link to={routes.SIGN_UP}>Sign Up</Link></li>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </div>

export default LandingPage;
