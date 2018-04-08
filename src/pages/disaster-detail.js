import React, { Component } from 'react';

import withAuthorization from '../components/Session/withAuthorization';
import { db } from '../firebase';

const fromObjectToList = (object) =>
  object
    ? Object.keys(object).map(key => ({ ...object[key], index: key }))
    : [];

class DisasterDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.location.state;
    console.log(this.state.disaster)
  }

  handleOpenDialog = () =>
    this.setState({ open: true })

  handleCloseDialog = () => {
    this.setState({ open: false })
  }


  render() {
    // const { disasters } = this.state;

    return (
      <div style={{ height: '80vh', color: 'white' }}>
        <p>{this.state.disaster.date}</p>

      </div>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(DisasterDetailPage);