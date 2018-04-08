import React from 'react'
import { navigateTo } from 'gatsby-link'
import { List, ListItem} from 'material-ui/List'
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import * as routes from '../../../constants/routes'

const DisasterList = ({ disasters, handleOpenDialog, handleCloseDialog }) =>
<List style={{ height: '80vh', overflow: 'scroll', backgroundColor: 'white', padding: '0px' }}>
<FlatButton label="Add New" primary={true} fullWidth={true} onClick={handleOpenDialog}/>
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
      onClick={() => navigateTo({pathname: routes.DETAIL, state: {disaster: disaster}})}
    />
    <Divider />
  </div>
  
)}

</List>

export default DisasterList;