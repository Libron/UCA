import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/ArrowRight';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Redirect, Route, Switch} from "react-router";
import { NavLink } from "react-router-dom";
import Zoom from "../containers/Zoom/Zoom";
import ZoomSoon from "../containers/ZoomSoon/ZoomSoon";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,

        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    margin: {
        margin: theme.spacing(2),
        paddingLeft: '12px'
    },
    padding: {
        padding: theme.spacing(0, 2),
    },
    item: {
        color: 'black',
        textDecoration: 'none'
    },
    active: {
        color: 'blue'
    }
}));



export default function Layout(props) {
    const { container, accounts } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const routes = Object.keys(accounts).map(id => ({
        id: id,
            email: accounts[id]
    }));

    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen);
    }

    const drawer = (
        <div>
            <List>
                <NavLink
                    to={"/zoom"}
                    className={classes.item}
                    activeClassName={classes.active}
                    exact
                >
                <ListItem button>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary={`All accounts (${routes.length})`} color={"action"}/>
                </ListItem>
                </NavLink>

                <NavLink
                    to={"/zoom/upcoming"}
                    className={classes.item}
                    activeClassName={classes.active}
                    exact
                >
                    <ListItem button>
                        <i className="material-icons" style={{marginRight: '10px'}}>access_alarm
                        </i>
                            <ListItemText primary="Upcoming meetings" color={"action"}/>
                    </ListItem>
                </NavLink>
            </List>
            <Divider />
            <List>
                {routes.map((item, index) => (
                    <NavLink
                        to={"/zoom/" + item.id}
                        className={classes.item}
                        activeClassName={classes.active}
                        key={index}
                        exact
                    >
                    <ListItem button >
                        <i className="material-icons" style={{marginRight: '10px'}}>
                            data_usage
                        </i>
                        <ListItemText primary={item.email} />
                    </ListItem>
                    </NavLink>
                ))}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Zoom Management Service
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="Mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Redirect from='/'  to='/zoom/upcoming' exact />
                    <Route path='/' component={Zoom} exact />
                    <Route path='/zoom' component={Zoom} exact />
                    <Route path='/zoom/upcoming' component={ZoomSoon} exact />
                    <Route path='/zoom/:id' component={Zoom} exact />
                </Switch>
            </main>
        </div>
    );
}

Layout.propTypes = {
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
};