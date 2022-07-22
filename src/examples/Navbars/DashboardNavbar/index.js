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
import { useLocation, Link } from "react-router-dom";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// import { GrFormClose } from "react-icons/gr";
import search from "../../../assets/images/search.png";
import "./index.styles.scss";
import SearchDrop from "./searchDrop";
// import button from "assets/theme/components/button";
// import fetch from "node-fetch";
// import data from "layouts/tables/data/authorsTableData";

// import Search from "./search";
// import axios from "axios";
// import App from "App";
// import { Search } from "@mui/icons-material";

export const UserContext = createContext();
function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [serachPopUp] = useState(false);
  const [searchName] = useState([
    "Vatsal",
    "Yash",
    "Tanish",
    "Gaurang",
    "Avin",
    "Ishan",
    "Pradip",
    "Akash",
  ]);

  const [searchFieldMain] = useState("");

  // const handleSearchTab = (e) => {
  //   if (e.target.value) {
  //     setSearchPopUp(true);
  //   } else {
  //     setSearchPopUp(false);
  //   }
  //   setSearchFieldMain(e.target.value);
  // };

  const filterdSearchName = searchName.filter((text) =>
    text.toLowerCase().includes(searchFieldMain.toLowerCase())
  );
  // const filter = (e) => {
  //   const search = fetch("https://cerv-api.herokuapp.com/admin/users/1");
  //   const keyword = e.target.value;

  //   if (keyword !== "") {
  //     const filteredData = search.filter((item) =>
  //       Object.values(item).join("").toLowerCase().includes(keyword.toLowerCase())
  //     );
  //     console.log(filteredData);
  //   }
  // };

  // const [fData] = useState("");
  // const [setCopyData] = useState([]);
  // const changeData = (e) => {
  //   // console.log(e);
  //   const getChangeData = e.toLowerCase();

  //   if (getChangeData === "") {
  //     setCopyData(fData);
  //   } else {
  //     const storeData = ("https://cerv-api.herokuapp.com/admin/search?term=tan&key=1")
  //     .then((response) => response.json())
  //       .then((json) => setData(json));
  //   }, []);
  //     setCopyData(storeData);
  //     console.log(storeData);
  //   }
  // };

  // const [searchItem, setSearchItem] = useState("");
  // const [gitRepos, setGitPespos] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [lists, setLists] = useState("");
  // const filter = (e) => {
  //   const keyword = e.target.value;

  //   if (keyword !== "") {
  //     const filteredData = felter((ittch("https://cerv-api.herokuapp.com/admin/users/1").fiem) =>
  //       Object.values(item).join("").toLowerCase().includes(keyword.toLowerCase())
  //     );
  //     setLists(filteredData);
  //     console.log(filteredData);
  //   }
  // };
  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // useEffect(() => {
    //   fetch("https://cerv-api.herokuapp.com/admin/search?term=tan&key=1")
    //     .then((response) => response.json())
    //     .then((json) => setData(json));
    //   console.log(data);
    // }, []);

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

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [show, setShow] = useState(false);
  // const [closeShow, setCloseShow] = useState(false);
  // const [isExpanded, setExpanded] = useState(false);
  // const isEmpty = searchResults === 0;

  // const onCloseCross = () => {
  //   setCloseShow(!closeShow);
  // };

  // const expandContainer = () => {
  //   setExpanded(true);
  // };

  // const changeHandler = (e) => {
  //   e.preventDefault();
  //   if (e.target.value === "") setSearchQuery(e.target.value);
  // };

  // const commonContainer = () => {
  //   setCloseShow(false);
  //   setShow(false);
  //   setSearchQuery("");
  //   setSearchResults([]);
  //   setOpenMenu(false);
  //   setNavbarType();
  // };

  // useEffect(() => {
  //   if (isClickedOutside) commonContainer();
  // }, [isClickedOutside]);
  // const navigate = useNavigate();
  // const navigatewith = useNavigate();

  const handleSearchQuery = async () => {
    const parsedSearchQuery = await JSON.parse(localStorage.getItem("user-info"));
    console.log(searchQuery);
    fetch(`https://inquiry-ts.herokuapp.com/user/search-query?term=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${parsedSearchQuery.data.accessToken}`,
      },
      method: "GET",
    })
      .then(async (res) => {
        const resJSON = await res.json();
        console.log("-------->", resJSON);
        setSearchResults(resJSON);
        setShow(!show);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  // const handlelogout = () => {
  //   const parsedUser = JSON.parse(localStorage.getItem("user-info"));
  //   fetch("https://cerv-api.herokuapp.com/users/logout", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${parsedUser.token}`,
  //     },
  //   })
  //     .then(async (res) => {
  //       localStorage.clear("user-info");
  //       const resJSON = await res.json();
  //       window.alert(resJSON.message);
  //       console.log(resJSON);
  //       navigate("/dashboard");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // {
  //   fetch("https://cerv-api.herokuapp.com/admin/users/1")
  //     .filter((val) => {
  //       if (searchItem === "") {
  //         return val;
  //       } else if (val.item.name.toLowerCase().includes(searchItem.toLowerCase())) {
  //         return val;
  //       }
  //     })
  //     .map((val, key) => {
  //       <div key={key}>
  //         <p>{val.item.name}</p>
  //       </div>;
  //     });
  // }

  // const handleSearchSubmit = () => {
  //   setIsLoading(true);
  //   const parsedUser = JSON.parse(localStorage.getItem("search"));
  //   fetch(`https://cerv-api.herokuapp.com/admin/search?term=tan&key=1`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${parsedUser.token}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(({ items }) => items ?? [])
  //     .then((items) =>
  //       items.map((item) => ({
  //         id: item.id,
  //         name: item.name,
  //       }))
  //     )
  //     .then(setGitPespos)
  //     .then(() => setIsLoading(false));
  // };
  // const [searchItem, setSearchItem] = useState("");

  // const handleSearch = () => {
  //   const parsedUser = JSON.parse(localStorage.getItem("user-info"));
  //   console.log(searchQuery);
  //   fetch(`https://cerv-api.herokuapp.com/admin/search?term=${searchQuery}&key=1`, {
  //     headers: {
  //       Authorization: `Bearer ${parsedUser.token}`,
  //     },
  //     method: "GET",
  //   })
  //     .then(async (res) => {
  //       const resJSON = await res.json();
  //       // window.alert(resJSON.message);
  //       console.log(resJSON);
  //       setSearchResults(resJSON.results);
  //       setShow(!show);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const disableSearch = () => {
  // };

  // const handleSearch = () => {
  //   const searchResponse = fetch(
  //     `https://cerv-api.herokuapp.com/admin/search?term=${searchQuery}&key=1`
  //   );
  //   if (searchResponse.message) {
  //     setSearchResults(searchResponse.data);
  //   } else {
  //     console.log(searchResponse);
  //   }
  // };

  // const response = await getRequest(`/customer/search?term=${search}`)
  //   // console.log(`\n\n\nSearched Products  `, response.data);
  //   if (response.success) {
  //     setResult(response.data)
  //     setLoading(false)
  //   } else {
  //     console.log(response);
  //   }
  // }

  // const handleSearch = async () => {
  //   const clear = await fetch("https://cerv-api.herokuapp.com/admin/users/1");
  //   const names = await clear.json();

  //   const matching = names
  //     .filter((item) => Object.values(item).join("").toLowerCase().includes(toLowerCase()))
  //     .then(async (clear) => {
  //       const clearJSON = await clear.json();
  //       console.log(clearJSON);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              {/* <input type="search" onChangeText={(e) => setSearchQuery(e)} /> */}
              <div>
                <MDInput
                  className="drop-for-tab"
                  label="Search here..."
                  // onChange={changeHandler}
                  style={{ marginRight: "-1.3rem", marginTop: "-0.5rem" }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // onClick={() => onCloseCross()}
                  // animate={isExpanded ? "collapsed" : "expanded"}
                  // onFocus={expandContainer}
                />
                {/* <GrFormClose /> */}
                {/* {isEmpty && <div style={{ color: "black" }}>Start search..</div>} */}
                {/* <MDInput
                  className="drop-for-tab"
                  label="Search here..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ marginRight: "-1.3rem", marginTop: "-0.5rem" }}
                  onClick={() => onCloseCross()}
                /> */}
              </div>
              {/* {isExpanded && ( */}
              <div className="drop-search">
                <div className="border-drop">
                  {searchResults?.data?.rooms?.map((object) => (
                    <div className="data-serach" key={object.id} style={{ color: "black" }}>
                      {object.title}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "5px",
                    boxShadow: "3px 3px 10px #CBC6C6",
                    width: "25%",
                    height: "auto",
                    background: "white",
                    color: "black",
                  }}
                >
                  {serachPopUp &&
                    filterdSearchName.map((text) => (
                      <SearchDrop
                        text={text}
                        search={search}
                        // setSearch={setSearch}
                        // setSearchPop={setSearchPop}
                        // setSearchField={setSearchField}
                      />
                    ))}
                </div>
              </div>
              <div className="image-search">
                <input
                  type="image"
                  src={search}
                  alt=""
                  onClick={handleSearchQuery}
                  width="20px"
                  height="20px"
                />
              </div>
            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>
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
            </MDBox>
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
