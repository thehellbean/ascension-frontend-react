import React, { useState, useMemo } from "react";
import {
  Drawer,
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {
  makeStyles,
  Theme,
  useTheme,
  createStyles
} from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "react-router-dom";
import { AppState } from "../store/initialState";
import { connect } from "react-redux";
import { logout } from "../actions/logout";

export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        height: 60,
        marginBottom: 60
      }
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth
    }
  })
);

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = useMemo(
    () =>
      React.forwardRef<
        HTMLAnchorElement,
        Omit<RouterLinkProps, "innerRef" | "to">
      >((itemProps, ref) => (
        <RouterLink to={to} {...itemProps} innerRef={ref} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

interface HeaderProps {
  userPresent: boolean;
  dispatch: Function;
}

const mapStateToProps = (state: AppState) => {
  return { userPresent: state.general.user !== undefined };
};

function Header(props: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);

  const LoggedInContents = () => {
    return (
      <>
        <ListItemLink to="/" primary="Home" />
        <ListItem button onClick={() => props.dispatch(logout())}>
          <ListItemText primary="Log Out" />
        </ListItem>
      </>
    );
  };

  const NotLoggedInContents = () => {
    return (
      <>
        <ListItemLink to="/login" primary="Login" />
        <ListItemLink to="/register" primary="Sign Up" />
      </>
    );
  };

  const DrawerContents = () => {
    return (
      <List>
        <ListItem>
          <Typography variant="h6">Ascension</Typography>
        </ListItem>
        {props.userPresent ? LoggedInContents() : NotLoggedInContents()}
      </List>
    );
  };

  return (
    <>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <Hidden implementation="css" smUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" noWrap>
            Header
          </Typography>
        </Toolbar>
      </AppBar>
      <Hidden xsDown implementation="js">
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          open
          variant="permanent"
        >
          {DrawerContents()}
        </Drawer>
      </Hidden>
      <Hidden smUp implementation="css">
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          anchor="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          variant="temporary"
        >
          {DrawerContents()}
        </Drawer>
      </Hidden>
    </>
  );
}

export default connect(mapStateToProps)(Header);
