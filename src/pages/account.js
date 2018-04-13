import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

import { PasswordForgetForm } from '../components/PasswordForget';
import PasswordChangeForm from '../components/PasswordChange';
import withAuthorization from '../components/Session/withAuthorization';

import { db } from '../firebase';

const fromObjectToList = (object) =>
  object
    ? Object.keys(object).map(key => ({ ...object[key], index: key }))
    : [];


class AccountPage extends Component {
  constructor(props, { authUser }) {
    super(props);
    this.state = {
      disasters: [],
      authUser: authUser,
    };
    db.onceGetDisasters().then(snapshot =>
      this.setState(() => ({ disasters: fromObjectToList(snapshot.val()) }))
    );
  }
  componentDidUpdate() {
    db.onceGetDisasters().then(snapshot =>
      this.setState(() => ({ disasters: fromObjectToList(snapshot.val()) }))
    );
  }

  handleOpenDialog = () =>
    this.setState({ open: true })

  handleCloseDialog = () => {
    this.setState({ open: false })
  }


  render() {
    const { disasters, authUser } = this.state;

    return (
      <div>
      <h1 style={{ color: 'white' }}>Account: {authUser.email}</h1>
      <div style={{ height: '80vh', color: 'white' }}>
        <List style={{ height: '80vh', overflow: 'scroll', backgroundColor: 'white', padding: '0px' }}>
          {disasters.map(disaster => fromObjectToList(disaster.events).map( event =>
            (event.claimedby == "MDRO") ?
            <div key={event.index}>
              <ListItem
                primaryText={`${event.title} - ${event.date}`}
                secondaryText={
                  <p>
                    <span style={{ color: darkBlack }}>{event.org}</span> -- {event.desc}
                    {(event.status == 'underway') ? <RaisedButton label="Complete" style={{ marginLeft: '5px' }} onClick={() => db.doFinishEvent("-L9X_AWcCQDTASOcWn4O", event.index)} /> : <span></span>}
                  </p>
                }
                secondaryTextLines={2}
                // onClick={}
                style={(event.status == 'complete') ? { backgroundColor: 'green', color: 'white' } : (event.status == 'underway' ? { backgroundColor: 'yellow', color: 'black' } : { backgroundColor: 'red', color: 'white' })}
                disabled={true}
              />
              <Divider />
            </div>
            : <span></span>
        ))}

        </List>

      </div>
    </div>
    )
   }
  }

  AccountPage.contextTypes = {
    authUser: PropTypes.object,
  };

  const authCondition = (authUser) => !!authUser;

  export default withAuthorization(authCondition)(AccountPage);

  