import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { GridList, GridTile } from 'material-ui/GridList'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

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
      <div style={{ height: '80vh' }}>
        <h1>Home</h1>
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
            />
          </GridTile>
          <GridTile
            cols={2}
            rows={1}
          >
            <ListGuy />
          </GridTile>
        </GridList>

      </div>
    );
  }
}

const ListGuy = () =>
  <List style={{height: '80vh', overflow: 'scroll', backgroundColor: 'white'}}>
    <Subheader>Today</Subheader>
    <ListItem
      // leftAvatar={<Avatar src="images/ok-128.jpg" />}
      primaryText="Brunch this weekend?"
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>Brendan Lim</span> --
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
      }
      secondaryTextLines={2}
    />
    <Divider inset={true} />
    <ListItem
      // leftAvatar={<Avatar src="images/kolage-128.jpg" />}
      primaryText={
        <p>Summer BBQ&nbsp;&nbsp;<span style={{ color: lightBlack }}>4</span></p>
      }
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>to me, Scott, Jennifer</span> --
          Wish I could come, but I&apos;m out of town this weekend.
            </p>
      }
      secondaryTextLines={2}
    />
    <Divider inset={true} />
    <ListItem
      // leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
      primaryText="Oui oui"
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>Grace Ng</span> --
          Do you have Paris recommendations? Have you ever been?
            </p>
      }
      secondaryTextLines={2}
    />
    <Divider inset={true} />
    <ListItem
      // leftAvatar={<Avatar src="images/kerem-128.jpg" />}
      primaryText="Birdthday gift"
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>Kerem Suer</span> --
          Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
      }
      secondaryTextLines={2}
    />
    <Divider inset={true} />
    <ListItem
      // leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
      primaryText="Recipe to try"
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>Raquel Parrado</span> --
          We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
      }
      secondaryTextLines={2}
    />
    <Subheader>Today</Subheader>
    <ListItem
      // leftAvatar={<Avatar src="images/ok-128.jpg" />}
      // rightIconButton={rightIconMenu}
      primaryText="Brendan Lim"
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>Brunch this weekend?</span><br />
          I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
      }
      secondaryTextLines={2}
    />
    <Divider inset={true} />
    <ListItem
      // leftAvatar={<Avatar src="images/kolage-128.jpg" />}
      // rightIconButton={rightIconMenu}
      primaryText="me, Scott, Jennifer"
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>Summer BBQ</span><br />
          Wish I could come, but I&apos;m out of town this weekend.
            </p>
      }
      secondaryTextLines={2}
    />
    <Divider inset={true} />
    <ListItem
      // leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
      // rightIconButton={rightIconMenu}
      primaryText="Grace Ng"
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>Oui oui</span><br />
          Do you have any Paris recs? Have you ever been?
            </p>
      }
      secondaryTextLines={2}
    />
    <Divider inset={true} />
    <ListItem
      // leftAvatar={<Avatar src="images/kerem-128.jpg" />}
      // rightIconButton={rightIconMenu}
      primaryText="Kerem Suer"
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>Birthday gift</span><br />
          Do you have any ideas what we can get Heidi for her birthday? How about a pony?
            </p>
      }
      secondaryTextLines={2}
    />
    <Divider inset={true} />
    <ListItem
      // leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
      // rightIconButton={rightIconMenu}
      primaryText="Raquel Parrado"
      secondaryText={
        <p>
          <span style={{ color: darkBlack }}>Recipe to try</span><br />
          We should eat this: grated squash. Corn and tomatillo tacos.
            </p>
      }
      secondaryTextLines={2}
    />
  </List>

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