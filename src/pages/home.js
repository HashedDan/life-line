import React, { Component } from 'react';
import DisasterList from '../components/Home/DisasterList'
import Map from '../components/Home/Map'
import NewDisaster from '../components/Home/NewDisaster'
import { GridList, GridTile } from 'material-ui/GridList'

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
      zoom: 11,
      open: false,
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
    const { disasters } = this.state;

    return (
      <div style={{ height: '80vh' }}>
        <NewDisaster open={this.state.open} handleCloseDialog={this.handleCloseDialog} handleSubmitDisaster={this.handleSubmitDisaster}/>
        <GridList
          cols={6}
          cellHeight='auto'
          padding={1}
        >
          <GridTile
            cols={4}
            rows={1}
            style={{ height: '100%' }}
          >
            <Map disasters={disasters} />
          </GridTile>
          <GridTile
            cols={2}
            rows={1}
          >
            <DisasterList disasters={disasters} handleOpenDialog={this.handleOpenDialog} />
          </GridTile>
        </GridList>

      </div>
    );
  }
}

// const ListGuy = ({ disasters }) =>
//   <List style={{ height: '80vh', overflow: 'scroll', backgroundColor: 'white', padding: '0px' }}>
//     <FlatButton label="Add New" primary={true} fullWidth={true} />
//     {disasters.map(disaster =>
//       <div key={disaster.index}>
//         <ListItem
//           primaryText={`${disaster.name} - ${disaster.date}`}
//           secondaryText={
//             <p>
//               <span style={{ color: darkBlack }}>{disaster.loc}</span> --
//             {disaster.desc}{` (${disaster.lng}, ${disaster.lat})`}
//             </p>
//           }
//           secondaryTextLines={2}
//         />
//         <Divider />
//       </div>

//     )}

//   </List>

const UserList = ({ users }) =>
  <div>
    <h2>List of App User IDs (Saved on Sign Up in Firebase Database)</h2>
    {users.map(user =>
      <div key={user.index}>{user.username}</div>
    )}
  </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage);