// import { Button } from "antd";
import { useEffect, useState } from "react";
import "./inquiryData.styles.scss";
import { Button, Drawer, Space } from "antd";
import { Editor } from "react-draft-wysiwyg";
import { useClickOutside } from "react-click-outside-hook";
import MDInput from "components/MDInput";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import useDebounce from "examples/Navbars/DashboardNavbar/debounceHook";
import axios from "axios";
// import TagPopupC from "./tagDrop";
import InquiryDrawer from "./inquiryDrawer";

export default function data() {
  const [customer] = useState([]);
  const [setIsLoading] = useState(true);
  const [mainData] = useState([]);
  const [setVisible] = useState(false);
  const [allQueryFetch, setAllQueryFetch] = useState({});
  const [all, setAll] = useState({});
  // console.log(allQueryFetch?.data?.rooms?.queries[2]?.text);
  const [placement] = useState("right");
  const [visibility, setVisibility] = useState(false);
  // const [tags, setTags] = useState(["Hello"]);
  const [temp, setTemp] = useState("");
  const [postdata, setPostTheData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [tvShows, setTvShows] = useState([]);
  const [noTvShows, setNoTvShows] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);
  const [hide, setHide] = useState(true);
  const [usero, setUsero] = useState("");
  console.log(usero);
  const [tagedUsers, setTagedUsers] = useState([]);
  const [filteredTagName, setFilteredTagName] = useState([]);
  const [show, setShow] = useState(true);
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [input, setInput] = useState("");
  const [searchElement, setSearchElement] = useState("");
  console.log(searchElement);
  // const [selectedTag, setSelectedTag] = useState(null);
  console.log(selectedTag);
  const [inquiryTitle, setInquiryTitle] = useState("");
  console.log(inquiryTitle);

  const [isPostEdit, setPostEdit] = useState("");

  const [isEdit, setIsEdit] = useState(false);
  console.log(isEdit);

  const teess = temp?.blocks?.map((item) => item.text);
  const userPost = tagedUsers;
  // console.log(tagedUsers);

  const titlePostInquiry = inquiryTitle?.target?.value;
  console.log(titlePostInquiry, userPost);

  const isEmpty = !tvShows || tvShows.length === 0 || searchQuery.length === 0;

  const collapseContainer = () => {
    setExpanded(false);
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

  const showDrawer = () => {
    setVisible(true);
  };

  // const [isShow, setIsShow] = useState(false);
  // const [show, setShow] = useState(true);
  // const [mainData] = useState({});
  // const [placement] = useState("right");

  // const handleShow = () => {
  //   setShow((current) => !current);
  // };

  // const handleSearchQuery = async () => {
  //   const parsedSearchQuery = await JSON.parse(localStorage.getItem("user-info"));
  //   // console.log(searchQuery);
  //   fetch(`https://inquiry-ts.herokuapp.com/user/search-query?term=${searchQuery}`, {
  //     headers: {
  //       Authorization: `Bearer ${parsedSearchQuery.data.accessToken}`,
  //     },
  //     method: "GET",
  //   })
  //     .then(async (res) => {
  //       const resJSON = await res.json();
  //       console.log("--------->>>>>>", resJSON);
  //       setSearchResults(resJSON);
  //       setShow(!show);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
    if (!searchQuery || searchQuery.trim() === "") return;
    setLoading(true);
    setNoTvShows(false);
    console.log(prepareSearchQuery);
    const response = await axios
      .get(`https://inquiry-ts.herokuapp.com/user/search-query?term=${searchQuery}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2FkZWRVc2VyIjp7ImlkIjoxLCJlbWFpbCI6InZhdHNhbHAudGNzQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmF0c2FsMTkiLCJyb2xlIjoyLCJpc19hY3RpdmUiOnRydWUsInJlc2V0VG9rZW4iOm51bGwsInJlc2V0VG9rZW5FeHBpcmF0aW9uIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTA3LTExVDA1OjQ2OjA0LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA3LTExVDA1OjQ2OjE5LjAwMFoifSwiaWF0IjoxNjU4NDk3MjEzLCJleHAiOjE2NTkxMDIwMTN9.U2ApxPDs-aDfNyez3leHp3F7JcMMQc0EIGLDhN7RHnw`,
        },
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
    console.log(response);

    if (response) {
      console.log("Response: ", response.data.data.rooms[0]?.queries);
      if (response.data) setNoTvShows(true);
      setTvShows(response?.data?.data?.rooms[0]?.queries);
    }
    setLoading(false);
  };
  useDebounce(searchQuery, 100, searchTvShow);

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
    setAll(allQueryData);
  };

  useEffect(() => {
    getAllQuery();
    // console.log(getAllQuery);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
  }, []);

  // useEffect(() => {
  //   getCustomers();
  // }, []);

  useEffect(() => {
    // console.log(customer);
  }, [customer]);

  const postEdit = async (title, user) => {
    const parsedEdit = JSON.parse(localStorage.getItem("user-info"));
    // console.log(parsedEdit);
    console.log(selectedRoom.id, title, user);
    const res = await fetch("https://inquiry-ts.herokuapp.com/user/edit-query-room", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${parsedEdit.data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: selectedRoom.id,
        title: `${title}`,
        users: user,
      }),
    });
    const response = await res.json();
    setPostEdit(response);
    console.log(isPostEdit);
  };

  const postTheQuery = async (text) => {
    setLoader(true);
    const parsedPostQuery = JSON.parse(localStorage.getItem("user-info"));
    console.log(parsedPostQuery);
    const response = await fetch("https://inquiry-ts.herokuapp.com/user/post-query", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsedPostQuery.data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: selectedRoom.id,
        text: `${text}`,
      }),
    });
    setPostTheData(response);

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
  };

  // const searchTag = async (tagSearch) => {
  //   console.log(tagSearch);
  //   const parsedSearchTag = await JSON.parse(localStorage.getItem("user-info"));
  //   fetch(`https://inquiry-ts.herokuapp.com/user/search-user?term=${tagSearch}`, {
  //     headers: {
  //       Authorization: `Bearer ${parsedSearchTag.data.accessToken}`,
  //     },
  //     method: "GET",
  //   })
  //     .then(async (res) => {
  //       const resJSON = await res.json();
  //       setFilteredTagName(resJSON.data?.users);
  //       console.log(setFilteredTagName);
  //       setSearchElement(resJSON);
  //       setShow(!show);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // console.log(allQueryFetch?.data?.rooms[selectedTag]?.taggedUsers?.username);
  // const onPushQuery = (e) => {
  //   e.preventDefault();
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

  const removeTag = (removedTag) => {
    const newTags = tagedUsers.filter((tag) => tag.username !== removedTag);
    setTagedUsers(newTags);
    console.log(removedTag);
  };

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const today = new Date();
  const currentTime = `${today.getHours()} : ${today.getMinutes()}`;

  // const valueForTag = () => {
  //   allQueryFetch?.data?.rooms[selectedTitle]?.taggedUsers?.map((name) => name.username);
  // };

  // console.log(
  //   allQueryFetch?.data?.rooms[selectedTitle]?.taggedUsers?.map((name) => name.username)
  // );

  const array = (titleSelect) => {
    const x = allQueryFetch?.data?.rooms[titleSelect]?.taggedUsers;
    console.log(x);
    return x;
  };

  // useEffect(() => {
  //   setTagedUsers((oldArray) => [...oldArray, ...array(selectedTitle)]);
  // }, [selectedTitle]);

  return {
    columns: [{ Header: "inquiry", accessor: "inquiry", width: "40%", align: "left" }],
    rows: [
      {
        inquiry: (
          <div>
            <div role="button" type="primary" tabIndex={0} style={{ cursor: "pointer" }}>
              {allQueryFetch?.data?.rooms?.map((item, index) => (
                <div className="main">
                  <div
                    className="fetch-title"
                    role="button"
                    onClick={() => {
                      setVisibility(true);
                      setSelectedTitle(index);
                      setTagedUsers(() => [...array(index)]);
                      setSelectedRoom(item);
                      setSelectedTag(index);
                    }}
                    onKeyDown={showDrawer}
                    tabIndex={0}
                    style={{ width: "1000px", color: "black" }}
                  >
                    {item.title}
                    <div style={{ color: "grey" }}>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
            <form>
              <div>
                <Drawer
                  title="Post Your Queries"
                  placement={placement}
                  width={800}
                  onClose={() => setVisibility(false)}
                  visible={visibility}
                  style={{ zIndex: 2000 }}
                  extra={
                    <Space>
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
                    </Space>
                  }
                >
                  {isEdit === false && (
                    <Button
                      style={{ marginLeft: "40rem" }}
                      onClick={() => {
                        setIsEdit(true);
                        console.log("---------->>setIsEdit");
                      }}
                    >
                      Edit
                    </Button>
                  )}
                  <div className="title-tags" style={{ display: "flex" }}>
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
                        onChange={(e) => {
                          setInquiryTitle(e);
                        }}
                        disabled={isEdit === false && "true"}
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
                              onChangeInput(e);
                            }}
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
                            disabled={isEdit === false && "true"}
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
                  <div className="change-editor" style={{ marginTop: "1rem" }}>
                    <h4>Text Editor</h4>
                  </div>
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
                  {!loader && (
                    <Button
                      type="button"
                      onClick={() => {
                        postTheQuery(teess, userPost);
                        setTemp("");
                        postEdit("====", titlePostInquiry, userPost);
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
                  {/* </form> */}
                  <div style={{ border: "1px solid black", marginTop: "1rem" }}>
                    <div>
                      <div
                        className="item-sender"
                        onClick={() => setVisibility(true)}
                        onKeyDown={showDrawer}
                        role="button"
                        tabIndex={0}
                      >
                        {all?.data?.rooms[selectedTitle]?.queries.map((items) => (
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
                                {/* {items.sender.createdAt.split("T")[1].split(".")[0]} */}
                                {date}
                                {currentTime}
                              </div>
                              <div
                                style={{
                                  marginLeft: "1.3rem",
                                  paddingTop: "10px",
                                  fontSize: "15px",
                                  width: "5rem",
                                }}
                              >
                                <div style={{ width: "12rem" }}>{items.text}</div>
                              </div>
                            </li>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Drawer>

                {loader && <div>loading...</div>}
              </div>
            </form>
            <InquiryDrawer onClick={showDrawer}>
              {/* {isLoading
                ? [...Array(4)].map((i) => (
                    <div className="phone-info" key={i}>
                      <h3>
                        <Skeleton width="150px" height="25px" />
                      </h3>
                      <br />
                    </div>
                  ))
                : customer.map((item) => (
                    <div key={item.id} item={item}>
                      <div className="phone-number">{item.phone_number}</div>
                      <br />
                    </div>
                  ))} */}
              {mainData?.data?.text}
            </InquiryDrawer>
          </div>
        ),
        phone: (
          <div>
            {/* <InquiryDrawer onClick={showDrawer}>
              {isLoading
                ? [...Array(4)].map((i) => (
                    <div className="phone-info" key={i}>
                      <h3>
                        <Skeleton width="150px" height="25px" />
                      </h3>
                      <br />
                    </div>
                  ))
                : customer.map((item) => (
                    <div key={item.id} item={item}>
                      <div className="phone-number">{item.phone_number}</div>
                      <br />
                    </div>
                  ))}
            </InquiryDrawer> */}
          </div>
        ),
        // status: (
        //   <div>
        //     {isLoading
        //       ? [...Array(4)].map((i) => (
        //           <div className="active-info" key={i}>
        //             <h3>
        //               <Skeleton width="75px" height="35px" />
        //             </h3>
        //             <br />
        //           </div>
        //         ))
        //       : customer.map((item) => (
        //           <div key={item.id} item={item}>
        //             <div className="active">{item.is_active ? "Online" : "Offline"}</div>
        //             <br />
        //           </div>
        //         ))}
        //   </div>
        // ),
      },
    ],
  };
}
