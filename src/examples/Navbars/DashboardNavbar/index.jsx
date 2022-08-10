/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
 =========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect, createContext } from "react";

// react-router components
import { useLocation } from "react-router-dom";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Menu from "@mui/material/Menu";
// import Icon from "@mui/material/Icon";
import { useClickOutside } from "react-click-outside-hook";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
// import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import { navbar, navbarContainer, navbarRow } from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import { useMaterialUIController, setTransparentNavbar } from "context";

// import { GrFormClose } from "react-icons/gr";
// import { useDebounce } from "../DashboardNavbar/debounceHook";
import axios from "axios";
// import search from "../../../assets/images/search.png";
import "./index.styles.scss";
import MDInput from "components/MDInput";
import useDebounce from "./debounceHook";
// import SearchDrop from "./searchDrop";

const containerVariants = {
  expanded: {
    height: "30em",
  },
  collapsed: {
    height: "3.8em",
  },
};

export const UserContext = createContext();
function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { transparentNavbar, fixedNavbar } = controller;
  // const [setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  // const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  // const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  // const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  // const handleCloseMenu = () => setOpenMenu(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [tvShows, setTvShows] = useState([]);
  const [noTvShows, setNoTvShows] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  // const [searchResults, setSearchResults] = useState("");
  // const [serachPopUp, setSearchPopUp] = useState("");
  // const [filterdSearchName, setFilterdSearchName] = useState("");
  // const [search, setSearch] = useState("");
  // console.log(setSearchResults, setSearchPopUp, setFilterdSearchName, setSearch);

  const isEmpty = !tvShows || tvShows.length === 0 || searchQuery.length === 0;
  // console.log(tvShows);

  const collapseContainer = () => {
    setExpanded(false);
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoTvShows(false);
    setSearchQuery(e.target.value);
    console.log(noTvShows);
  };

  const expandContainer = () => {
    setExpanded(true);
  };

  const prepareSearchQuery = (query) => {
    const url = `https://inquiry-ts.herokuapp.com/user/search-query?term=${query}`;

    return encodeURI(url);
  };

  const searchTvShow = async () => {
    const parsedPostQuery = JSON.parse(localStorage.getItem("user-info"));
    if (!searchQuery || searchQuery.trim() === "") return;
    setLoading(true);
    setNoTvShows(false);

    console.log(prepareSearchQuery(searchQuery));

    const response = await axios
      .get(`https://inquiry-ts.herokuapp.com/user/search-query?term=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${parsedPostQuery.data.accessToken}`,
        },
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    console.log(response);

    if (response) {
      console.log("Response: ", response.data.data.rooms[0].title);
      if (response.data) setNoTvShows(true);
      setTvShows(response?.data?.data?.rooms);
    }
    setLoading(false);
  };
  useDebounce(searchQuery, 100, searchTvShow);

  // const renderMenu = () => (
  //   <Menu
  //     anchorEl={openMenu}
  //     anchorReference={null}
  //     anchorOrigin={{
  //       vertical: "bottom",
  //       horizontal: "left",
  //     }}
  //     open={Boolean(openMenu)}
  //     onClose={handleCloseMenu}
  //     sx={{ mt: 2 }}
  //   >
  //     <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
  //     <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
  //     <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
  //   </Menu>
  // );

  // Styles for the navbar icons
  // const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
  //   color: () => {
  //     let colorValue = light || darkMode ? white.main : dark.main;

  //     if (transparentNavbar && !light) {
  //       colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
  //     }

  //     return colorValue;
  //   },
  // });
  // const [searchItem, setSearchItem] = useState("");

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <div animate={isExpanded ? "expanded" : "collapsed"} variants={containerVariants}>
                <div>
                  <MDInput
                    placeholder="Search here"
                    onFocus={expandContainer}
                    value={searchQuery}
                    onChange={changeHandler}
                    ref={parentRef}
                  />
                </div>
                {isExpanded && !isEmpty && (
                  <div>
                    {!isLoading && (
                      <div className="drop-search">
                        <div>
                          {tvShows.map((object) => (
                            <div> {object.title} </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </MDBox>
            {/* <MDBox color={light ? "white" : "inherit"}>
              <Link to="/authentication/sign-in/basic">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle} style={{ marginTop: "-30px" }}>
                    account_circle
                  </Icon>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
                style={{ marginTop: "-30px" }}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
                style={{ marginTop: "-30px" }}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </MDBox> */}
            <IconButton color="inherit" size="small" style={{ marginTop: "-30px" }} />
            {/* {localStorage.getItem("user-info") ? (
                <Link to="/authentication/sign-in" onClick={handlelogout}>
                  Log Out
                </Link>
              ) : (
                <Link to="/authentication/sign-in">Sign-in</Link>
              )} */}
            {/* </IconButton> */}
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
