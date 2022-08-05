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

// @mui material components
import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

import inquiryData from "layouts/inquiry/data/inquiryData";
import inquiry from "layouts/inquiry/data/inquiry";
import "antd/dist/antd.min.css";
import { Button, Drawer, Radio, Space } from "antd";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import MDButton from "components/MDButton";
import "./index.css";
// import TagPopupC from "./data/tagDrop";

function Inquiry() {
  const { columns, rows } = inquiryData();
  const { columns: pColumns, rows: pRows } = inquiry();
  const [setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  // const [tags, setTags] = useState([]);
  // const [postTheData, setPostTheData] = useState("");
  const [postQueryRooms, setPostQueryRooms] = useState("");
  const [visibility, setVisibility] = useState(false);
  // const [temp, setTemp] = useState("");
  const [loader, setLoader] = useState(false);
  const [allQueryFetch, setAllQueryFetch] = useState({});
  console.log(allQueryFetch);
  const [tempTitle, setTempTitle] = useState("");
  console.log(tempTitle);
  const [tempDes, setTempDes] = useState("");
  console.log(tempDes);
  const [tagedUsers, setTagedUsers] = useState([]);
  // console.log(setTagedUsers);
  const [usero, setUsero] = useState("");
  const [searchElement, setSearchElement] = useState("");
  const [show, setShow] = useState(true);
  const [filteredTagName, setFilteredTagName] = useState([]);
  const [hide, setHide] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  console.log(selectedTag);
  console.log(usero);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  // const { Option } = Select;

  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  // };

  const onChangeInput = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimInput = input.trim();

    if (key === "Enter" && trimInput.length && !tags.includes(trimInput)) {
      e.preventDefault();
      setTags((prev) => [...prev, trimInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      e.preventDefault();
      const tagsCopy = [...tags];
      const popTag = tagsCopy.pop();
      setTags(tagsCopy);
      setInput(popTag);
    }
    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  // const deleteTag = (idx) => {
  //   setTags((prev) => [...prev].filter((_, id) => id !== idx));
  // };
  // const [selectUser, setSelectUser] = useState("");
  // console.log(selectUser.bubble);
  // console.log(searchElement.bubble);
  // console.log(tagedUsers.bubble);
  // const [saveTitle, setSaveTitle] = useState("");
  // const [saveDes, setSaveDes] = useState("");
  // const [saveEd, setSaveEd] = useState("");
  // const [saveShow, setSaveShow] = useState(false);

  // console.log(saveTitle);
  // console.log(saveDes);
  // console.log(saveEd);

  const titlePost = tempTitle?.target?.value;
  console.log(titlePost);
  const desPost = tempDes?.target?.value;
  console.log(desPost);
  const userPost = tagedUsers;
  console.log(tagedUsers);
  console.log(userPost);
  console.log(searchElement);

  const removeTag = (removedTag) => {
    const newTags = tagedUsers.filter((tag) => tag.username !== removedTag);
    setTagedUsers(newTags);
    console.log(removedTag);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const getAllQuery = async () => {
    const parsedAll = JSON.parse(localStorage.getItem("user-info"));
    const response = await fetch("https://inquiry-ts.herokuapp.com/user/get-query-rooms", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${parsedAll.data.accessToken}`,
      },
    });
    const allQueryData = await response.json();
    // console.log(allQueryData);
    setAllQueryFetch(allQueryData);
    // console.log(allQueryFetch);
  };
  useEffect(() => {
    getAllQuery();
  }, []);

  const postQueryRoom = async (title, description, user) => {
    setLoader(true);
    const parsedPostQueryRoom = JSON.parse(localStorage.getItem("user-info"));
    console.log(title, description, user);
    const res = await fetch("https://inquiry-ts.herokuapp.com/user/post-query-room", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsedPostQueryRoom.data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${title}`,
        description: `${description}`,
        users: user,
      }),
    });
    const response = await res.json();
    setPostQueryRooms(response);
    console.log(postQueryRooms);
    console.log("---------->>>>>>", response);
    setLoader(false);
    window.location.reload(false);
  };

  const searchTag = async (tagSearch) => {
    console.log(tagSearch);
    const parsedSearchTag = await JSON.parse(localStorage.getItem("user-info"));
    fetch(`https://inquiry-ts.herokuapp.com/user/search-user?term=${tagSearch}`, {
      headers: {
        Authorization: `Bearer ${parsedSearchTag.data.accessToken}`,
      },
      method: "GET",
    })
      .then(async (res) => {
        const resJSON = await res.json();
        // console.log("==-=-=-=-=-=-", resJSON.data);
        setFilteredTagName(resJSON.data?.users);
        console.log(setFilteredTagName);
        // console.log(tagSearch);
        setSearchElement(resJSON);
        setShow(!show);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const roleCheck = localStorage.getItem("user-info");

  const role = JSON.parse(roleCheck);

  const finalRole = role?.data?.user?.role;

  console.log("check for role--------------->>>>>>>>", finalRole);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Inquiry Table
                  <Space>
                    <Radio.Group value={placement} onChange={onChange} />
                    {finalRole === 0 || finalRole === 1 ? (
                      <div
                        role="button"
                        className="open-drawer"
                        type="primary"
                        onClick={() => setVisibility(true)}
                        onKeyDown={showDrawer}
                        tabIndex={0}
                      >
                        +CreateRoom
                      </div>
                    ) : (
                      ""
                    )}
                  </Space>
                  <form>
                    <Drawer
                      title="Create Room"
                      placement={placement}
                      width={800}
                      onClose={() => setVisibility(false)}
                      visible={visibility}
                      style={{ zIndex: 2000 }}
                    >
                      <div>
                        <div className="title-des" style={{ justifyContent: "space-between" }}>
                          <div className="title-drawer">
                            <h4>Title</h4>
                            <input
                              type="text"
                              onChange={(e) => {
                                setTempTitle(e);
                              }}
                              style={{
                                width: "47rem",
                                height: "2.7rem",
                                border: "1px solid black",
                                borderRadius: "5px",
                                color: "black",
                                outline: "none",
                                paddingLeft: "10px",
                                fontSize: "15px",
                              }}
                            />
                          </div>
                          <div style={{ marginTop: "2rem" }}>
                            <h4>Description</h4>
                            <input
                              type="text"
                              onChange={(e) => {
                                setTempDes(e);
                              }}
                              style={{
                                width: "47rem",
                                height: "2.7rem",
                                border: "1px solid black",
                                borderRadius: "5px",
                                color: "black",
                                // outline: "none",
                                paddingLeft: "10px",
                                fontSize: "15px",
                              }}
                            />
                          </div>
                        </div>
                        <div style={{ color: "black", marginTop: "1rem" }}>
                          <h4>User</h4>
                          <div>
                            <div style={{ display: "flex", position: "absolute" }}>
                              {tagedUsers.map((text) => (
                                <div
                                  style={{
                                    marginLeft: "1rem",
                                    border: "1px solid black",
                                    fontSize: "15px",
                                    marginTop: "5px",
                                    padding: "0 10px",
                                  }}
                                >
                                  {text.username}
                                  <span
                                    style={{
                                      paddingLeft: "10px",
                                      cursor: "pointer",
                                    }}
                                    onKeyDown
                                    onClick={() => removeTag(text.username)}
                                    role="button"
                                    tabIndex={0}
                                  >
                                    x
                                  </span>
                                </div>
                              ))}
                            </div>
                            <input
                              type="text"
                              onChange={(e) => {
                                searchTag(e.target.value);
                                onChangeInput(e);
                              }}
                              onFocus={() => setHide(true)}
                              onKeyDown={onKeyDown}
                              onKeyUp={onKeyUp}
                              style={{
                                // width: "47rem",
                                // height: "2.7rem",
                                // border: "1px solid black",
                                // borderRadius: "5px",
                                // color: "black",
                                // outline: "none",
                                // paddingLeft: "10px",
                                width: "100%",
                                minWidth: "50%",
                                borderRadius: "5px",
                                padding: "5px",
                                paddingLeft: "14px",
                                border: "1px solid black",
                                fontSize: "15px",
                              }}
                              onClick={(e) => {
                                searchTag(e.target.value);
                              }}
                            />
                          </div>
                          {!show && (
                            <div>
                              {hide && (
                                <div
                                  style={{
                                    border: "1px solid black",
                                    cursor: "pointer",
                                    fontSize: "15px",
                                  }}
                                >
                                  {filteredTagName.map((user) => (
                                    <div
                                      style={{
                                        color: "black",
                                        paddingTop: "10px",
                                        marginLeft: "22rem",
                                      }}
                                      tabIndex={0}
                                      onKeyDown={(e) => {
                                        setSelectedTag(e);
                                        setTagedUsers((oldArray) => [...oldArray, user]);
                                        onKeyDown(e);
                                      }}
                                      role="button"
                                      onClick={(e) => {
                                        setTagedUsers((oldArray) => [...oldArray, user]);
                                        setUsero(e.target.innerText);
                                        setHide(false);
                                        setSelectedTag(e);
                                        onKeyDown(e);
                                        searchTag(e);
                                      }}
                                      onChange={(e) => {
                                        searchTag(e.target.value);
                                        onChangeInput(e);
                                      }}
                                    >
                                      {user.username}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ marginTop: "2rem" }}>
                        {!loader && (
                          <Button
                            type="button"
                            onClick={() => {
                              postQueryRoom(titlePost, desPost, userPost);
                            }}
                          >
                            CREATE
                          </Button>
                        )}
                        {loader && (
                          <Button type="button" disabled>
                            Loading...
                          </Button>
                        )}
                      </div>
                    </Drawer>
                  </form>
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDTypography />
              <DataTable
                table={{ columns: pColumns, rows: pRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Inquiry;
