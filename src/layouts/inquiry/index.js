import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Editor } from "react-draft-wysiwyg";
import useDebounce from "examples/Navbars/DashboardNavbar/debounceHook";
import { useClickOutside } from "react-click-outside-hook";
import axios from "axios";

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
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [isLoading, setLoading] = useState(false);
  const [setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [postQueryRooms, setPostQueryRooms] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [loader, setLoader] = useState(false);
  const [allQueryFetch, setAllQueryFetch] = useState({});
  const [tempTitle, setTempTitle] = useState("");
  const [tempDes, setTempDes] = useState("");
  const [parentRef, isClickedOutside] = useClickOutside();
  const [tagedUsers, setTagedUsers] = useState([]);
  const [usero, setUsero] = useState("");
  const [searchElement, setSearchElement] = useState("");
  const [show, setShow] = useState(true);
  const [filteredTagName, setFilteredTagName] = useState([]);
  const [hide, setHide] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [isCreated, setCreated] = useState(false);
  const [nameTag, setNameTag] = useState("");
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [postdata, setPostTheData] = useState("");
  const [all, setAll] = useState({});
  const [showEmail, setShowEmail] = useState([]);
  const [isExpanded, setExpanded] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [noTvShows, setNoTvShows] = useState(false);
  const [editLoader, setEditLoader] = useState(false);
  const [temp, setTemp] = useState("");
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [storeTitle, setStoreTitle] = useState("");
  const [isPostEdit, setPostEdit] = useState("");
  const [getRoom, setGetRoom] = useState("");
  const titlePostInquiry = storeTitle;
  const editorPost = temp?.blocks?.map((item) => item.text);
  const [tvShows, setTvShows] = useState([]);
  const [titleChange, setTitleChange] = useState(false);
  // const [inquiryTitle, setInquiryTitle] = useState("");
  // console.log(inquiryTitle);
  const isEmpty = !tvShows || tvShows.length === 0 || searchQuery.length === 0;

  const collapseContainer = () => {
    setExpanded(false);
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const expandContainer = () => {
    setExpanded(true);
  };

  const changeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") setNoTvShows(false);
    setSearchQuery(e.target.value);
    setSearchField(e.target.value);
  };

  const postEdit = async (title, user) => {
    setEditLoader(true);
    const editedUser = user;
    const postTitle = title;
    for (let i = 0; i < editedUser.length; i += 1) {
      if (editedUser[i].userId) {
        editedUser[i].id = editedUser[i].userId;
      } else {
        editedUser[i].is_new = 1;
      }
    }
    const parsedEdit = JSON.parse(localStorage.getItem("user-info"));
    const res = await fetch("https://inquiry-ts.herokuapp.com/user/edit-query-room", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${parsedEdit.data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: selectedRoom.id,
        title: postTitle,
        users: editedUser,
      }),
    });
    const response = await res.json();
    if (response.status === 0) {
      alert(`${response.message}`);
    } else {
      alert(`${response.message}`);
      setPostEdit(response);
      setEditLoader(false);
      window.location.reload(false);
    }
  };

  const prepareSearchQuery = (query) => {
    const url = `https://inquiry-ts.herokuapp.com/user/search-query?term=${query}`;
    return encodeURI(url);
  };

  const searchTvShow = async () => {
    if (!searchQuery || searchQuery.trim() === "") return;
    setLoading(true);
    setNoTvShows(false);
    const response = await axios
      .get(`https://inquiry-ts.herokuapp.com/user/search-query?term=${searchQuery}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2FkZWRVc2VyIjp7ImlkIjoxLCJlbWFpbCI6InZhdHNhbHAudGNzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmF0c2FsMTkiLCJyb2xlIjoyLCJpc19hY3RpdmUiOnRydWUsInJlc2V0VG9rZW4iOm51bGwsInJlc2V0VG9rZW5FeHBpcmF0aW9uIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTA3LTExVDA1OjQ2OjA0LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA3LTExVDA1OjQ2OjE5LjAwMFoifSwiaWF0IjoxNjU4NDk3MjEzLCJleHAiOjE2NTkxMDIwMTN9.U2ApxPDs-aDfNyez3leHp3F7JcMMQc0EIGLDhN7RHnw`,
        },
      })
      .catch((err) => {
        console.log("Error: ", err);
      });

    if (response) {
      if (response.data) setNoTvShows(true);
      setTvShows(response?.data?.data?.rooms[0]?.queries);
    }
    setLoading(false);
  };
  useDebounce(searchQuery, 100, searchTvShow);

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

  const removeTag = (removedTag) => {
    const newTags = tagedUsers.filter((tag) => tag.username !== removedTag);
    setTagedUsers(newTags);
  };

  const filtereduserData = all?.data?.rooms[0]?.queries.filter((user) =>
    user.text?.toLowerCase().includes(searchField.toLowerCase())
  );

  const drawerData = all?.data?.rooms[0];
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const today = new Date();
  const currentTime = `${today.getHours()} : ${today.getMinutes()}`;

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

  const getAllRoom = async () => {
    const parsedAllRoom = JSON.parse(localStorage.getItem("user-info"));
    const responseAll = await fetch("https://inquiry-ts.herokuapp.com/user/get-query-rooms", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${parsedAllRoom.data.accessToken}`,
      },
    })
    const allQueryDataRoom = await responseAll.json();
    setGetRoom(allQueryDataRoom);
  };
  useEffect(() => {
    getAllRoom();
  }, [])

  const postQueryRoom = async (title, description, user, text) => {
    setLoader(true);
    const postTitle = title;
    const postDescription = description;
    const parsedPostQueryRoom = JSON.parse(localStorage.getItem("user-info"));
    const res = await fetch("https://inquiry-ts.herokuapp.com/user/post-query-room", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsedPostQueryRoom.data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postTitle,
        description: postDescription,
        users: user,
      }),
    });
    const response = await res.json();
    console.log(response);
    if (response.status === 0) {
      alert(`${response.message}`);
      setLoader(false);
    } else {
      setPostQueryRooms(response);
      if (response.status === 1) {
        const postText = text;
        const parsedPostQuery = JSON.parse(localStorage.getItem("user-info"));
        const api = await fetch("https://inquiry-ts.herokuapp.com/user/post-query", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${parsedPostQuery.data.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomId: response.data.id,
            text: postText,
          }),
        });
        const response3 = await api.json();
        if (response3.status === 0) {
          alert(`${response3.message}`);
          setLoader(false);
        } else {
          setPostTheData(api);
          const parsedAll = JSON.parse(localStorage.getItem("user-info"));
          const response1 = await fetch("https://inquiry-ts.herokuapp.com/user/get-query-rooms", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${parsedAll.data.accessToken}`,
            },
          });
          const allQueryData = await response1.json();

          if (allQueryData.status === 0) {
            alert(`${allQueryData.message}`);
            setLoader(false);
          } else {

            setAll(allQueryData);
            setLoader(false);
            setVisibility(true);
          }
        }
        setLoader(false);
        setCreated(true);
      }

    }

    // window.location.reload(false);
  };

  const postTheQuery = async (text) => {
    setLoader(true);
    const postText = text;
    const parsedPostQuery = JSON.parse(localStorage.getItem("user-info"));
    const response = await fetch("https://inquiry-ts.herokuapp.com/user/post-query", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsedPostQuery.data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: selectedRoom.id,
        text: postText,
      }),
    });
    const allQueryData1 = await response.json();
    if (allQueryData1.status === 0) {
      alert(`${allQueryData1.message}`);
    }
    setPostTheData(response);

    const parsedAll = JSON.parse(localStorage.getItem("user-info"));
    const response1 = await fetch("https://inquiry-ts.herokuapp.com/user/get-query-rooms", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${parsedAll.data.accessToken}`,
      },
    });
    const allQueryData = await response1.json();
    if (allQueryData.status === 0) {
      alert(`${allQueryData.message}`);
    }
    setAll(allQueryData);
    setLoader(false);
  };

  const searchTag = async (tagSearch) => {
    const parsedSearchTag = await JSON.parse(localStorage.getItem("user-info"));
    fetch(`https://inquiry-ts.herokuapp.com/user/search-user?term=${tagSearch}`, {
      headers: {
        Authorization: `Bearer ${parsedSearchTag.data.accessToken}`,
      },
      method: "GET",
    })
      .then(async (res) => {
        const resJSON = await res.json();
        setFilteredTagName(resJSON.data?.users);
        setSearchElement(resJSON);
        setShow(!show);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
  }, []);

  const roleCheck = localStorage.getItem("user-info");

  const role = JSON.parse(roleCheck);

  const finalRole = role?.data?.user?.role;

  const user1 = localStorage.getItem("user-info");

  const id = JSON.parse(user1);

  const userId = id?.data?.user?.id;

  // const array = (titleSelect) => {
  //   const x = allQueryFetch?.data?.rooms[titleSelect]?.taggedUsers;
  //   console.log(x);
  //   return x;
  // };

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
                  {isCreated === false ?
                    (
                      <div>
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
                              <AiOutlineClose
                                onClick={() => setVisibility(false)}
                                visible={visibility}
                                style={{ cursor: "pointer" }}
                              />
                              <p>Create Room</p>
                              {!loader && (
                                <Button
                                  type="button"
                                  onClick={() => {
                                    postQueryRoom(titlePost, desPost, userPost, editorPost);
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
                                    onChange={(e, index) => {
                                      setTempTitle(e);
                                      setSelectedTitle(index);
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
                                            display: "flex",
                                            flexDirection: "row",
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
                                            onKeyDown={() => removeTag(text.username)}
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
                                        setNameTag(e.target.value);
                                      }}
                                      value={nameTag}
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
                                                setNameTag("");
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
                                    {!loader && (
                                      <Button
                                        type="button"
                                        onClick={() => {
                                          postQueryRoom(titlePost, desPost, userPost, editorPost);
                                        }}
                                      >
                                        SAVE
                                      </Button>
                                    )}
                                    {loader && (
                                      <Button type="button" disabled>
                                        Loading...
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Drawer>
                        </form>
                      </div>
                    ) : (
                      <div>
                        <form>
                          <div>
                            <Drawer
                              placement={placement}
                              onClose={() => setVisibility(false)}
                              closable={false}
                              width={800}
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
                                <div>
                                  <AiOutlineClose
                                    onClick={() => {
                                      setVisibility(false);
                                      window.location.reload(false);
                                    }}
                                    visible={visibility}
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                                <p style={{ paddingLeft: "60px" }}>Post Your Queries</p>
                                <div>
                                  <div>
                                    <MDInput
                                      type="search"
                                      placeholder="Search Here..."
                                      onChange={changeHandler}
                                      value={searchQuery}
                                      onFocus={expandContainer}
                                      ref={parentRef}
                                    />
                                  </div>
                                  {isExpanded && !isEmpty && (
                                    <div>
                                      {!isLoading && (
                                        <div className="drop-inq-search">
                                          <div>
                                            {tvShows.map((object) => (
                                              <div> {object.text} </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div
                                className="title-tags"
                                style={{
                                  display: "flex",
                                  marginTop: "2rem",
                                }}
                              >
                                <div className="title-drawer">
                                  <h4>Title</h4>
                                  <input
                                    type="text"
                                    style={{
                                      width: "22rem",
                                      height: "2.6rem",
                                      border: "1px solid black",
                                      borderRadius: "5px",
                                      color: "black",
                                      outline: "none",
                                      paddingLeft: "10px",
                                      fontSize: "15px",
                                    }}
                                    value={drawerData?.title}
                                    onChange={(e) => {
                                      setStoreTitle(e.target.value);
                                      setTitleChange(true);
                                    }}
                                    disabled={
                                      userId !== selectedRoom.salesmanId ? selectedRoom.title : null
                                    }
                                  />
                                </div>
                                <div style={{ marginLeft: "2.5rem" }}>
                                  <h4>Users</h4>
                                  <div>
                                    <div
                                      style={{
                                        height: "auto",
                                        width: "22rem",
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
                                          setNameTag(e.target.value);
                                        }}
                                        value={nameTag}
                                        onFocus={() => setHide(true)}
                                        onKeyDown={onKeyDown}
                                        onKeyUp={onKeyUp}
                                        style={{
                                          width: "21rem",
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
                                        disabled={
                                          userId !== selectedRoom.salesmanId
                                            ? selectedRoom.title
                                            : null
                                        }
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
                                            {filteredTagName?.map((user) => (
                                              <div
                                                style={{
                                                  color: "black",
                                                  paddingTop: "10px",
                                                  marginLeft: "10rem",
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
                                                  setNameTag("");
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
                              </div>
                              {!editLoader && userId === selectedRoom.salesmanId ? (
                                <Button
                                  onClick={() => {
                                    setIsEdit(true);
                                    postEdit(titlePostInquiry, userPost);
                                  }}
                                >
                                  SAVE
                                </Button>
                              ) : (
                                ""
                              )}
                              {editLoader && userId === selectedRoom.salesmanId ? (
                                <Button disabled>Loading...</Button>
                              ) : (
                                ""
                              )}
                              <div className="change-editor" style={{ marginTop: "2rem" }}>
                                <h4>Text Editor</h4>
                              </div>
                              <Editor
                                className="editor-text"
                                onChange={(e) => {
                                  const x = e;
                                  setTemp(x);
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
                              {!loader && (
                                <Button
                                  type="button"
                                  onClick={() => {
                                    postTheQuery(editorPost);
                                    setTemp("");
                                  }}
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
                                  border: "1px solid black",
                                  marginTop: "1rem",
                                  width: "100%",
                                  overflowX: "scroll",
                                }}
                              >
                                <div>
                                  <div
                                    className="item-sender"
                                    onClick={() => setVisibility(true)}
                                    onKeyDown={showDrawer}
                                    role="button"
                                    tabIndex={0}
                                  >
                                    {filtereduserData?.map((items) => (
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
                                              marginTop: "-28px",
                                              fontSize: "15px",
                                            }}
                                          >
                                            {items.sender.username}
                                          </div>
                                          <div
                                            style={{
                                              paddingLeft: "150px",
                                              marginTop: "-25px",
                                              fontSize: "15px",
                                            }}
                                          >
                                            {items.sender.createdAt.split("T")[0]}
                                          </div>
                                          <div
                                            style={{
                                              paddingLeft: "300px",
                                              marginTop: "-25px",
                                              fontSize: "15px",
                                            }}
                                          >
                                            {date}
                                            {currentTime}
                                          </div>
                                          <div
                                            style={{
                                              width: "90%",
                                              height: "auto",
                                            }}
                                          >
                                            <p
                                              style={{
                                                marginLeft: "1.3rem",
                                                paddingTop: "10px",
                                                fontSize: "15px",
                                              }}
                                            >
                                              {items.text}
                                            </p>
                                          </div>
                                        </li>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Drawer>
                          </div>
                        </form>
                      </div>
                    )}
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
