import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import NotificationsIcon from '@material-ui/icons/Notifications';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const drawerWidth = 250;

const styles = theme => ({
    root: {
        display: 'flex',
      },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
    drawerPaper: {
        position: 'relative',
        height: 750,
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        width: 60,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerInner: {
        // Make the items inside not wrap when transitioning:
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        height: 56,
        [theme.breakpoints.up('sm')]: {
            height: 64,
        },
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
});

const MiniDrawer = (props) => {

    let {navDrawerOpen} = props;
    const classes = props.classes;

    return (
        <div className={classes.root}>
        <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{
                paper: classNames(classes.drawerPaper, !navDrawerOpen && classes.drawerPaperClose),
            }}
            open={navDrawerOpen}
            anchor={"left"}
        >
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <LocalTaxiIcon />
                    </ListItemIcon>
                    <ListItemText primary="Products"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <NotificationsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Notifications"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings"/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <HelpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Help"/>
                </ListItem>
                
            </List>
        </Drawer>
        </div>
    )
};

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    navDrawerOpen: PropTypes.bool
};


/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, authService), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MiniDrawer))