/**
 * Created by chalosalvador on 5/2/21
 */
import { useState } from "react";
import Image from "next/image";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link as MuiLink } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
  Box,
  Divider,
  Drawer,
  ListItem,
  ListItemText,
  useScrollTrigger,
} from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import clsx from "clsx";

import Routes from "../constants/routes";
import SearchBar from "./SearchBar";
import IconsMenu from "./IconsMenu";

const drawerWidth = 240;
const mainMenuItems = [
  {
    text: "Mis Productos",
    to: Routes.ARTICLES,
  },

    {
    text: "Productos",
    to: Routes.PRODUCTS,
  },
  {
    text: "Registrar Producto",
    to: Routes.ABOUT,
  },
];
const useStyles = makeStyles((theme) => ({
  appBar: {
    // backgroundColor: "#90caf9",
    // color: "#000000",
    maxHeight: 64,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    display: "none",
    padding: 8,
    maxHeight: 64,
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    "& a img": {
      maxHeight: 45,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

function HideOnScroll(props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function MainMenu(props) {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const renderDrawerMenu = (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={openDrawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={handleDrawerClose}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        {mainMenuItems.map((item, index) => (
          <Link href={item.to} key={item.text}>
            <ListItem button onClick={() => setOpenDrawer(false)}>
              <ListItemText>{item.text}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
      {/*<Divider />*/}
      {/*<List>*/}
      {/*  {["All mail", "Trash", "Spam"].map((text, index) => (*/}
      {/*    <ListItem button key={text}>*/}
      {/*      <ListItemIcon>*/}
      {/*        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}*/}
      {/*      </ListItemIcon>*/}
      {/*      <ListItemText primary={text} />*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</List>*/}
    </Drawer>
  );

  return (
    <div className={classes.grow}>
      <HideOnScroll {...props}>
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <div className={classes.sectionMobile}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, openDrawer && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </div>

            <Box className={classes.logo}>
              <Link href={Routes.HOME} passHref>
                <MuiLink>
                  <Image
                      src="/store.png"
                      alt="store"
                      width={136}
                      height={45}
                  />
                </MuiLink>
              </Link>
            </Box>

            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
              {mainMenuItems.map((item) => (
                <Link href={item.to} key={item.text}>
                  <MenuItem>{item.text}</MenuItem>
                </Link>
              ))}
            </div>

            <div className={classes.grow} />

            {/*<SearchBar />*/}

            <IconsMenu />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {renderDrawerMenu}
      <Toolbar />
    </div>
  );
}
