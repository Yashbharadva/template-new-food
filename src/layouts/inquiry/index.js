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
  const [setAllQueryFetch] = useState({});
  const [tempTitle, setTempTitle] = useState("");
  const [tempDes, setTempDes] = useState("");
  const [tagedUsers, setTagedUsers] = useState([]);
  // console.log(setTagedUsers);
  const [setUsero] = useState("");
  const [setSearchElement] = useState("");
  const [show, setShow] = useState(true);
  const [filteredTagName, setFilteredTagName] = useState([]);
  const [hide, setHide] = useState(true);
  const [setSelectedTag] = useState(null);
  // console.log(selectedTag);
  // console.log(usero);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);

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

  const deleteTag = (idx) => {
    setTags((prev) => [...prev].filter((_, id) => id !== idx));
  };
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
  // console.log(titlePost, searchElement);
  const desPost = tempDes?.target?.value;
  // console.log(desPost);
  const userPost = tagedUsers;
  // console.log(searchElement);
  // const editorPost = temp?.blocks?.map((item) => item.text);

  // const addTag = (e) => {
  //   if (e.key === "Enter") {
  //     if (e.target.value.length > 0) {
  //       setTags([...tags, e.target.value]);
  //       e.target.value = "";
  //     }
  //   }
  // };

  // const [tagPopUp, setTagPopUp] = useState(false);

  // const [searchField, setSearchField] = useState("");
  // const handleTag = (e) => {
  //   if (e.target.value) {
  //     setTagPopUp(true);
  //   } else {
  //     setTagPopUp(false);
  //   }
  //   // setTagName(e);
  // };
  // const filteredTagName = tagName.filter((name) =>
  //   name.toString().toLowerCase().includes(searchField.toLowerCase())
  // );

  // const removeTag = (removedTag) => {
  //   const newTags = tags.filter((tag) => tag !== removedTag);
  //   setTags(newTags);
  // };

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
  // console.log(postQueryRoom);

  // const postTheQuery = async () => {
  //   setLoader(true);
  //   const parsedPostQuery = JSON.parse(localStorage.getItem("user-info"));
  //   console.log(parsedPostQuery);
  //   const response = await fetch("https://inquiry-ts.herokuapp.com/user/post-query", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${parsedPostQuery.data.accessToken}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       roomId: 2,
  //       text: `${editorPost}`,
  //     }),
  //   });
  //   setPostTheData(response);
  //   console.log(postTheData);
  //   console.log(response);
  //   window.location.reload(false);
  //   setVisibility(true);
  //   setLoader(false);
  // };

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

  // useEffect(() => {
  //   searchTag();
  // }, []);

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
                    <div
                      role="button"
                      className="open-drawer"
                      type="primary"
                      onClick={() => setVisibility(true)}
                      onKeyDown={showDrawer}
                      tabIndex={0}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        marginLeft: "80rem",
                        marginTop: "-1rem",
                      }}
                    >
                      +CreateRoom
                    </div>
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
                      <div className="title-des" style={{ justifyContent: "space-between" }}>
                        <div className="title-drawer">
                          <h2>Title</h2>
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
                            }}
                          />
                        </div>
                        <div style={{ marginTop: "2rem" }}>
                          <h2>Description</h2>
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
                            }}
                          />
                        </div>
                      </div>
                      <div style={{ color: "black", marginTop: "1rem" }}>
                        <h2>User</h2>
                        <input
                          type="text"
                          onChange={(e) => {
                            searchTag(e.target.value);
                            onChangeInput(e);
                          }}
                          onFocus
                          onKeyDown={onKeyDown}
                          onKeyUp={onKeyUp}
                          value={input}
                          // value={tagedUsers[0]?.username}
                          placeholder="Enter a tag"
                          // value={`${tagedUsers[0]?.username}, ${tagedUsers[1]?.username}, ${tagedUsers[]?.username}, ${tagedUsers[0]?.username}`}
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
                            border: "none",
                            borderRadius: "5px",
                            padding: "14px",
                            paddingLeft: "14px",
                          }}
                          onClick={(e) => {
                            searchTag(e.target.value);
                          }}
                          // value={tagedUsers[0]?.username}
                        />
                        <div
                          style={{
                            display: "flex",
                            width: "calc(100% - 14px)",
                            maxWidth: "100%",
                            paddingLeft: "14px",
                            borderRadius: "5px",
                            color: "black",
                          }}
                        >
                          {tags?.map((user, idx) => (
                            <div
                              style={{
                                border: "1px solid black",
                                display: "flex",
                                alignItems: "center",
                                margin: "7px 0",
                                marginRight: "10px",
                                padding: "0 10px",
                                paddingRight: "5px",
                                borderRadius: "5px",
                                whiteSpace: "nowrap",
                                color: "black",
                              }}
                            >
                              {user}
                              <button
                                type="button"
                                style={{
                                  display: "flex",
                                  padding: "6px",
                                  border: "none",
                                  backgroundColor: "unset",
                                  cursor: "pointer",
                                  color: "black",
                                  marginTop: "0px",
                                }}
                                onClick={() => deleteTag(idx)}
                              >
                                x
                              </button>
                            </div>
                          ))}
                        </div>
                        {!show && (
                          <div>
                            {hide && (
                              <div style={{ border: "1px solid black", cursor: "pointer" }}>
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
                      {/* <div className="tag-item" style={{ marginTop: "1rem" }}>
                        <h2>Tags</h2>
                        <div className="tag-container">
                          {tags.map((tag) => (
                            <div className="tag">
                              {tag}
                              <span
                                onClick={() => removeTag(tag)}
                                onKeyDown={() => removeTag(tag)}
                                role="button"
                                tabIndex={0}
                              >
                                X
                              </span>
                            </div>
                          ))}
                          <input
                            onKeyDown={addTag}
                            onChange={(e) => {
                              setTagPopUp(true);
                              searchTag(e.target.value);
                            }}
                            style={{ color: "black" }}
                            onFocus={() => setTagPopUp(true)}
                          />
                        </div>
                        <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "5px",
                          boxShadow: "3px 3px 10px #CBC6C6",
                          width: "100%",
                          height: "auto",
                          background: "white",
                          color: "black",
                        }}
                        >
                          {tagPopUp &&
                          {filteredTagName.map((user) => (
                            <div>{user.username}</div>
                          ))}
                        </div>
                      </div> */}
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
                      {/* <div className="change-editor" style={{ marginTop: "1rem" }}>
                        <h2>Text Editor</h2>
                        <Editor
                        className="editor-text"
                          onChange={(e) => {
                            setTemp(e);
                            // setSaveEd(e);
                          }}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                          wrapperStyle={{
                            width: 745,
                            border: "1px solid black",
                            height: "700",
                            color: "black",
                            paddingLeft: "10px",
                          }}
                        />
                      </div> */}
                      {/* <div
                        className="button-save"
                        style={{
                          border: "1px solid black",
                          padding: "10px 10px",
                          width: "3.7rem",
                          marginTop: "1rem",
                          color: "black",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setSaveShow(true);
                        }}
                        onKeyDown={() => {
                          setSaveShow(true);
                        }}
                        tabIndex={0}
                        role="button"
                      >
                        SAVE
                      </div> */}
                      {/* {saveShow && (
                        <div>
                          <div
                            style={{
                              color: "black",
                              marginTop: "2rem",
                            }}
                          >
                            {tempTitle?.target?.value}
                          </div>
                          <div
                            style={{
                              color: "black",
                              paddingTop: "10px",
                            }}
                          >
                            {tempDes?.target?.value}
                          </div>

                          <div style={{ marginTop: "1rem" }}>
                            <div>
                              {allQueryFetch?.data?.rooms?.map(() => (
                              <div
                                className="item-sender"
                                onClick={() => setVisibility(true)}
                                onKeyDown={showDrawer}
                                role="button"
                                tabIndex={0}
                                style={{ color: "black" }}
                              >
                                vatsal19
                                {item?.queries[0]?.sender?.username}
                                {item?.queries?.map((items) => (
                                    <div  
                                      style={{
                                        color: "black",
                                        paddingTop: "20px",
                                        cursor: "pointer",
                                        marginLeft: "1rem",
                                      }}
                                    >
                                      <li>
                                        <div
                                          style={{
                                            paddingLeft: "20px",
                                            marginTop: "-20px",
                                          }}
                                        >
                                          {items?.sender?.username}
                                        </div>
                                        <div
                                          style={{
                                            color: "black",
                                            paddingTop: "10px",
                                          }}
                                        >
                                          {temp?.blocks?.map(() => item.text)}
                                        </div>
                                      </li>
                                    </div>
                                  ))}
                              </div>
                              ))}
                            </div>
                            <div
                              style={{
                                color: "black",
                                // paddingTop: "10px",
                                marginLeft: "5rem",
                                marginTop: "-21px",
                              }}
                            >
                              {temp?.blocks?.map((obj) => obj.text)}
                            </div>
                          </div>
                        </div>
                      )} */}
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
