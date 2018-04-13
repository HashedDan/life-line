import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import NewEvent from '../components/DisasterDetail/NewEvent'

import PropTypes from 'prop-types';
import withAuthorization from '../components/Session/withAuthorization';
import { db } from '../firebase';

const fromObjectToList = (object) =>
    object
        ? Object.keys(object).map(key => ({ ...object[key], index: key }))
        : [];

class DisasterDetailPage extends Component {
    constructor(props, { authUser }) {
        super(props);
        this.state = {
            disaster: fromObjectToList(this.props.location.state.disaster.events),
            open: false,
            disasterId: this.props.location.state.disaster.index,
            userId: authUser.uid,
        };
        // console.log(this.state.disaster.events)
        console.log(authUser.uid);
    }

    handleOpenDialog = () =>
        this.setState({ open: true })

    handleCloseDialog = () => {
        this.setState({ open: false })
    }


    render() {
        const { disaster, disasterId, userId } = this.state;

        return (
            <div style={{ height: '80vh', color: 'white' }}>
                <NewEvent open={this.state.open} disasterId={disasterId} handleCloseDialog={this.handleCloseDialog}/>
                <List style={{ height: '80vh', overflow: 'scroll', backgroundColor: 'white', padding: '0px' }}>
                    <FlatButton label="Add New" primary={true} fullWidth={true}  onClick={this.handleOpenDialog}/>
                    {disaster.map(event =>
                        <div key={event.index}>
                            <ListItem
                                primaryText={`${event.title} - ${event.date}`}
                                secondaryText={
                                    <p>
                                        <span style={{ color: darkBlack }}>{event.org}</span> -- {event.desc}
                                        {(event.status == 'incomplete') ? <RaisedButton label="Claim" style={{marginLeft: '5px'}} onClick={() => {db.doClaimEvent(disasterId, event.index, userId); alert("Event Claimed!")}}/> : <span></span>}
                                    </p>
                                }
                                secondaryTextLines={2}
                                // onClick={}
                                style={(event.status == 'complete') ? {backgroundColor: 'green', color: 'white'} : (event.status == 'underway' ? {backgroundColor: 'yellow', color: 'black'} : {backgroundColor: 'red', color: 'white'}) }
                                disabled={true}
                            />
                            <Divider />
                        </div>

                    )}

                </List>

            </div>
        );
    }
}

DisasterDetailPage.contextTypes = {
    authUser: PropTypes.object,
  };

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(DisasterDetailPage);