import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { GridList, GridTile } from 'material-ui/GridList'
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer'
import FlatButton from 'material-ui/FlatButton'

import mapStyle from '../styles/covertmap.json'
import withAuthorization from '../components/Session/withAuthorization';
import { db } from '../firebase';

const fromObjectToList = (object) =>
  object
    ? Object.keys(object).map(key => ({ ...object[key], index: key }))
    : [];

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disasters: [],
      center: { lat: 59.95, lng: 30.33 },
      zoom: 11
    };
  }

  componentDidMount() {
    db.onceGetDisasters().then(snapshot =>
      this.setState(() => ({ disasters: fromObjectToList(snapshot.val()) }))
    );
  }

  render() {
    const { disasters } = this.state;

    return (
      <div style={{ height: '80vh' }}>
        <h1>Disasters</h1>
        {/* <p>The Home Page is accessible by every signed in user.</p>

        { !!users.length && <UserList users={users} /> } */}
        <GridList
          cols={6}
          cellHeight='auto'
          padding={1}
        // style={{height: '100%'}}
        >
          <GridTile
            cols={4}
            rows={1}
            style={{ height: '100%' }}
          >
            <MyMapComponent
              isMarkerShown={true}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDR5Uai7RHVMuveaBzlPYnECg0usXWafZk&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `80vh` }} />}
              disasters={disasters}
            />
          </GridTile>
          <GridTile
            cols={2}
            rows={1}
          >
            <ListGuy disasters={disasters} />
          </GridTile>
        </GridList>

      </div>
    );
  }
}

const ListGuy = ({ disasters }) =>
  <List style={{ height: '80vh', overflow: 'scroll', backgroundColor: 'white', padding: '0px' }}>
    <FlatButton label="Add New" primary={true} fullWidth={true}/>
    {disasters.map(disaster =>
      <div key={disaster.index}>
        <ListItem
          primaryText={`${disaster.name} - ${disaster.date}`}
          secondaryText={
            <p>
              <span style={{ color: darkBlack }}>{disaster.loc}</span> --
            {disaster.desc}{` (${disaster.lng}, ${disaster.lat})`}
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider />
      </div>
    )}

  </List>

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 38.627003, lng: -90.199402 }}
    defaultOptions={{ styles: mapStyle }}
  >
    {props.isMarkerShown &&
      props.disasters.map(disaster =>
        <div key={disaster.index}>
          <Marker position={{ lat: parseInt(disaster.lat), lng: parseInt(disaster.lng) }} onMouseOver={() => alert(disaster.name)}/>
        </div>
      )}
  </GoogleMap>
))

const UserList = ({ users }) =>
  <div>
    <h2>List of App User IDs (Saved on Sign Up in Firebase Database)</h2>
    {users.map(user =>
      <div key={user.index}>{user.username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);