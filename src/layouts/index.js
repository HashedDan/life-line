import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Navigation from '../components/Navigation';
import withAuthentication from '../components/Session/withAuthentication';

import './index.css';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Life Line"
      meta={[
        { name: 'description', content: 'Helping the helpers.' },
        { name: 'keywords', content: 'disaster relief' },
      ]}
    />
    <div className="app">
      <Navigation />

      <hr/>

      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default withAuthentication(TemplateWrapper)
