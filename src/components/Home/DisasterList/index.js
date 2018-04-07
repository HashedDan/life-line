import React from 'react'
import { List, ListItem} from 'material-ui/List'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'

const DisasterList = ({ disasters }) =>
<List style={{ height: '80vh', overflow: 'scroll', backgroundColor: 'white', padding: '0px' }}>
<FlatButton label="Add New" primary={true} fullWidth={true} />
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

export default DisasterList;