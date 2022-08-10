import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Editor } from "react-draft-wysiwyg";

import inquiryData from "layouts/inquiry/data/inquiryData";
import inquiry from "layouts/inquiry/data/inquiry";
import "antd/dist/antd.min.css";
import { Button, Drawer, Radio, Space } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./index.css";

function Inquiry() {
  const { columns, rows } = inquiryData();
  const { columns: pColumns, rows: pRows } = inquiry();
  const [setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [postQueryRooms, setPostQueryRooms] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [loader, setLoader] = useState(false);
  const [allQueryFetch, setAllQueryFetch] = useState({});
  console.log(allQueryFetch);
  const [tempTitle, setTempTitle] = useState("");
  console.log(tempTitle);
  const [tempDes, setTempDes] = useState("");
  console.log(tempDes);
  const [tagedUsers, setTagedUsers] = useState([]);
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
  const [postdata, setPostTheData] = useState("");
  const [all, setAll] = useState({});
  const [showEmail, setShowEmail] = useState([]);
  console.log(showEmail);
  console.log(all);
  const [temp, setTemp] = useState("");
  const teess = temp?.blocks?.map((item) => item.text);

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

  const titlePost = tempTitle?.target?.value;
  const desPost = tempDes?.target?.value;
  const userPost = tagedUsers;
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
    setAllQueryFetch(allQueryData);
  };
  useEffect(() => {
    getAllQuery();
  }, []);

  const postQueryRoom = async (title, description, user, text) => {
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

    if (response.status === 1) {
      const parsedPostQuery = JSON.parse(localStorage.getItem("user-info"));
      console.log(parsedPostQuery);
      const api = await fetch("https://inquiry-ts.herokuapp.com/user/post-query", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${parsedPostQuery.data.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: response.data.id,
          text: `${text}`,
        }),
      });
      setPostTheData(api);

      const parsedAll = JSON.parse(localStorage.getItem("user-info"));
      const response1 = await fetch("https://inquiry-ts.herokuapp.com/user/get-query-rooms", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${parsedAll.data.accessToken}`,
        },
      });
      const allQueryData = await response1.json();
      setAll(allQueryData);
      console.log(postdata);
      console.log(response);
      // window.location.reload(false);
      setLoader(false);
      setVisibility(true);
    }
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
        console.log("==-=-=-=-=-=-", resJSON.data);
        setFilteredTagName(resJSON.data?.users);
        console.log(setFilteredTagName);
        console.log(tagSearch);
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
                      placement={placement}
                      width={800}
                      onClose={() => setVisibility(false)}
                      closable={false}
                      visible={visibility}
                      style={{ zIndex: 2000 }}
                    >
                      <div
                        style={{
                          color: "black",
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          borderBottom: "1px solid black",
                          paddingBottom: "10px",
                        }}
                      >
                        <AiOutlineClose />
                        <p>Create Room</p>
                        {!loader && (
                          <Button
                            type="button"
                            onClick={() => {
                              postQueryRoom(titlePost, desPost, userPost, teess);
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
                      <div>
                        <div
                          className="title-des"
                          style={{
                            justifyContent: "space-between",
                            paddingTop: "20px",
                          }}
                        >
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
                                paddingLeft: "10px",
                                fontSize: "15px",
                              }}
                            />
                          </div>
                        </div>
                        <div style={{ color: "black", marginTop: "1rem" }}>
                          <h4>User</h4>
                          <div>
                            <div
                              style={{
                                height: "auto",
                                width: "47rem",
                                border: "1px solid black",
                                borderRadius: "5px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                }}
                              >
                                {tagedUsers.map((text) => (
                                  <div
                                    style={{
                                      marginLeft: "1rem",
                                      border: "1px solid black",
                                      fontSize: "15px",
                                      marginTop: "5px",
                                      padding: "0 10px",
                                      color: "black",
                                      borderRadius: "5px",
                                    }}
                                  >
                                    {text.username}
                                    <span
                                      style={{
                                        paddingLeft: "10px",
                                        cursor: "pointer",
                                        color: "black",
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
                                  width: "46rem",
                                  height: "auto",
                                  border: "none",
                                  borderRadius: "5px",
                                  color: "black",
                                  outline: "none",
                                  paddingLeft: "10px",
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
                                          marginLeft: "20rem",
                                        }}
                                        tabIndex={0}
                                        onKeyDown
                                        role="button"
                                        onClick={(e) => {
                                          setTagedUsers((oldArray) => [...oldArray, user]);
                                          setUsero(e.target.innerText);
                                          setHide(false);
                                          setSelectedTag(e);
                                          onKeyDown(e);
                                          searchTag(e);
                                          setShowEmail(e);
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
                            <div style={{ paddingTop: "50px" }}>
                              <Editor
                                className="editor-text"
                                onChange={(e) => {
                                  const x = e;
                                  setTemp(x);
                                  console.log(x);
                                }}
                                style={{ color: "black" }}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                wrapperStyle={{
                                  width: 735,
                                  border: "1px solid black",
                                  height: "700",
                                  color: "black",
                                  paddingLeft: "10px",
                                  fontSize: "15px",
                                }}
                              />
                            </div>
                          </div>
                        </div>
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
