import React from 'react';
import Link from 'gatsby-link';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import * as routes from '../../constants/routes';

import { auth } from '../../firebase'

const UserMenu = (props) =>
    <IconMenu
        // {...props}
        iconButtonElement={
            <IconButton><MoreVertIcon color="white" /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >

        <Link to={routes.HOME} style={{ textDecoration: "none" }}><MenuItem primaryText="Dashboard" /></Link>
        <Link to={routes.ACCOUNT} style={{ textDecoration: "none" }}><MenuItem primaryText="Account" /></Link>
        <MenuItem primaryText="Sign Out" onClick={auth.doSignOut} />
    </IconMenu>

export default UserMenu;