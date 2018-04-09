import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'

import withAuthorization from '../components/Session/withAuthorization';
import { db } from '../firebase';

const fromObjectToList = (object) =>
    object
        ? Object.keys(object).map(key => ({ ...object[key], index: key }))
        : [];

class DisasterDetailPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disaster: fromObjectToList(this.props.location.state.disaster.events),
            open: false,
        };
        // console.log(this.state.disaster.events)
    }

    handleOpenDialog = () =>
        this.setState({ open: true })

    handleCloseDialog = () => {
        this.setState({ open: false })
    }


    render() {
        const { disaster } = this.state;

        return (
            <div style={{ height: '80vh', color: 'white' }}>
                <List style={{ height: '80vh', overflow: 'scroll', backgroundColor: 'white', padding: '0px' }}>
                    <FlatButton label="Add New" primary={true} fullWidth={true}  onClick={this.handleOpenDialog}/>
                    {disaster.map(event =>
                        <div key={event.index}>
                            <ListItem
                                primaryText={`${event.title} - ${event.date}`}
                                secondaryText={
                                    <p>
                                        <span style={{ color: darkBlack }}>{event.org}</span> -- {event.desc}
                                        {(event.type == 'demand') ? <RaisedButton label="Claim" style={{marginLeft: '5px'}}/> : <span></span>}
                                    </p>
                                }
                                secondaryTextLines={2}
                                // onClick={}
                                style={(event.type == 'supply') ? {backgroundColor: 'green', color: 'white'} : {backgroundColor: 'red', color: 'white'}}
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

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(DisasterDetailPage);