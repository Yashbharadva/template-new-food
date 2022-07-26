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
import "antd/dist/antd.css";
import { Button, Drawer, Radio, Space } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import MDButton from "components/MDButton";
import "./index.css";
import TagPopupC from "./data/tagDrop";

function Inquiry() {
  const { columns, rows } = inquiryData();
  const { columns: pColumns, rows: pRows } = inquiry();
  const [setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [tags, setTags] = useState(["Hello"]);
  // const [postdata, setPostTheData] = useState("");
  const [postQueryRooms, setPostQueryRooms] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [temp, setTemp] = useState("");
  const [loader, setLoader] = useState(false);
  const [allQueryFetch, setAllQueryFetch] = useState({});
  const [tempTitle, setTempTitle] = useState("");
  const [tempDes, setTempDes] = useState("");

  const titlePost = tempTitle?.target?.value;
  const desPost = tempDes?.target?.value;
  const editorPost = temp?.blocks?.map((item) => item.text);

  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
      }
    }
  };

  const [tagPopUp, setTagPopUp] = useState(false);
  const [tagName] = useState([
    "Vatsal",
    "Yash",
    "Tanish",
    "Gaurang",
    "Avin",
    "Ishan",
    "Pradip",
    "Akash",
  ]);
  const [searchField, setSearchField] = useState("");
  const handleTag = (e) => {
    if (e.target.value) {
      setTagPopUp(true);
    } else {
      setTagPopUp(false);
    }
    setSearchField(e.target.value);
  };
  const filteredTagName = tagName.filter((name) =>
    name.toLowerCase().includes(searchField.toLowerCase())
  );

  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
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
    console.log(allQueryFetch);
  };
  useEffect(() => {
    getAllQuery();
  }, []);

  const postQueryRoom = async (title, description) => {
    setLoader(true);
    const parsedPostQueryRoom = JSON.parse(localStorage.getItem("user-info"));
    console.log(parsedPostQueryRoom);
    const response = await fetch("https://inquiry-ts.herokuapp.com/user/post-query-room", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsedPostQueryRoom.data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${title}`,
        description: `${description}`,
        users: [
          { id: 1, username: "vatsal19", email: "vatsalp.tcs@gmail.com" },
          { id: 2, username: "gaurang", email: "gaurangpatel.tcs@gmail.com" },
        ],
      }),
    });
    setPostQueryRooms(response);
    console.log(postQueryRooms);
    console.log("---------->>>>>>", response);
    setLoader(false);
    window.location.reload(false);
  };
  // console.log(postQueryRoom);

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
                      +CreateInquiry
                    </div>
                  </Space>
                  <form>
                    <Drawer
                      title="Send Your Queriy"
                      placement={placement}
                      width={800}
                      onClose={() => setVisibility(false)}
                      visible={visibility}
                      style={{ zIndex: 2000 }}
                      extra={
                        <Space>
                          <Button>SAVE</Button>
                        </Space>
                      }
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
                              width: "22rem",
                              height: "2.7rem",
                              border: "1px solid black",
                              borderRadius: "5px",
                              color: "black",
                              outline: "none",
                              paddingLeft: "10px",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            marginTop: "-5.40rem",
                            marginLeft: "25rem",
                          }}
                        >
                          <h2>Description</h2>
                          <input
                            type="text"
                            onChange={(e) => {
                              setTempDes(e);
                            }}
                            style={{
                              width: "22rem",
                              height: "2.7rem",
                              border: "1px solid black",
                              borderRadius: "5px",
                              color: "black",
                              outline: "none",
                              paddingLeft: "10px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="tag-item" style={{ marginTop: "1rem" }}>
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
                            onChange={handleTag}
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
                            filteredTagName.map((name) => (
                              <TagPopupC
                                name={name}
                                tags={tags}
                                setTags={setTags}
                                setTagPopUp={setTagPopUp}
                                setSearchField={setSearchField}
                              />
                            ))}
                        </div>
                      </div>
                      <div className="change-editor" style={{ marginTop: "1rem" }}>
                        <h2>Text Editor</h2>
                        <Editor
                          className="editor-text"
                          onChange={(e) => {
                            setTemp(e);
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
                      </div>
                      {!loader && (
                        <Button
                          type="button"
                          onClick={() => postQueryRoom(titlePost, desPost, editorPost)}
                        >
                          SAVE
                        </Button>
                      )}
                      {loader && (
                        <Button type="button" disabled>
                          Loading...
                        </Button>
                      )}
                      <div
                        style={{
                          color: "black",
                          marginTop: "2rem",
                        }}
                      >
                        Title: {tempTitle?.target?.value}
                      </div>
                      <div
                        style={{
                          color: "black",
                          paddingTop: "10px",
                        }}
                      >
                        Description: {tempDes?.target?.value}
                      </div>
                      <div
                        style={{
                          color: "black",
                          paddingTop: "10px",
                        }}
                      >
                        Text Editor: {temp?.blocks?.map((item) => item.text)}
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
