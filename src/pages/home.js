import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

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
      users: [],
      center: { lat: 59.95, lng: 30.33 },
      zoom: 11
    };
  }

  componentDidMount() {
    db.onceGetUsers().then(snapshot =>
      this.setState(() => ({ users: fromObjectToList(snapshot.val()) }))
    );
  }

  render() {
    const { users } = this.state;

    return (
      <div>
        <h1>Home</h1>
        {/* <p>The Home Page is accessible by every signed in user.</p>

        { !!users.length && <UserList users={users} /> } */}
        <MyMapComponent
          isMarkerShown={true}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDR5Uai7RHVMuveaBzlPYnECg0usXWafZk&libraries=geometry,drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 38.627003, lng: -90.199402 }}
    defaultOptions={{ styles: mapStyle }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 38.627003, lng: -90.199402 }} />}
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