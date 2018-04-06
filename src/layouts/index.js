import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Navigation from '../components/Navigation';
import withAuthentication from '../components/Session/withAuthentication';

import './index.css';

const TemplateWrapper = ({ children }) => (
  <MuiThemeProvider>
    <div>
      <Helmet
        title="Life Line"
        meta={[
          { name: 'description', content: 'Helping the helpers.' },
          { name: 'keywords', content: 'disaster relief' },
        ]}
      />
      <Navigation />
      <div className="app">
        {children()}
      </div>
    </div>
  </MuiThemeProvider>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default withAuthentication(TemplateWrapper)
