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
import TagPopupC from "./tagDrop";
import InquiryDrawer from "./inquiryDrawer";

export default function data() {
  const [customer] = useState([]);
  const [setIsLoading] = useState(true);
  const [mainData] = useState([]);
  const [setVisible] = useState(false);
  const [allQueryFetch, setAllQueryFetch] = useState({});
  const [placement] = useState("right");
  const [visibility, setVisibility] = useState(false);
  const [tags, setTags] = useState(["Hello"]);
  const [temp, setTemp] = useState("");
  const [postdata, setPostTheData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loader, setLoader] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [tvShows, setTvShows] = useState([]);
  const [noTvShows, setNoTvShows] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();

  const teess = temp?.blocks?.map((item) => item.text);
  // console.log(temp);

  const isEmpty = !tvShows || tvShows.length === 0 || searchQuery.length === 0;

  const collapseContainer = () => {
    setExpanded(false);
  };

  useEffect(() => {
    if (isClickedOutside) collapseContainer();
  }, [isClickedOutside]);

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

  // const closeField = () => {
  //   if (tvShows.length || !tvShows === 0) {
  //     setExpanded(false);
  //   } else {
  //     setExpanded(true);
  //   }
  // };

  // const [isShow, setIsShow] = useState(false);
  // const [show, setShow] = useState(true);
  // const [mainData] = useState({});
  // const [placement] = useState("right");

  // const handleShow = () => {
  //   setShow((current) => !current);
  // };

  // const postQuery = async () => {
  //   const parsedPost = JSON.parse(localStorage.getItem("user-info"));
  //   console.log(parsedPost);
  //   const response = await fetch("https://inquiry-ts.herokuapp.com/user/post-query-room", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${parsedPost.data.accessToken}`,
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       users: [
  //         { id: 1, username: "vatsal19", email: "vatsalp.tcs@gmail.com" },
  //         { id: 2, username: "gaurang", email: "gaurangpatel.tcs@gmail.com" },
  //       ],
  //     }),
  //   });
  //   const postData = await response.json();
  //   console.log(postData);
  //   setPostMainData(postData);
  // };
  // console.log(postMainData);

  // useEffect(() => {
  //   postQuery();
  // }, []);

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

    console.log("-------------------->>>>>>>>>", prepareSearchQuery(searchQuery));

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
        roomId: 1,
        text: `${text}`,
      }),
    });
    setPostTheData(response);
    console.log(postdata);
    console.log(response);
    window.location.reload(false);
    setVisibility(true);
    setLoader(false);
  };

  // const buttonLoader = () => {
  //   setLoader(true);
  // };

  return {
    columns: [{ Header: "inquiry", accessor: "inquiry", width: "40%", align: "left" }],
    rows: [
      {
        inquiry: (
          // <Button onClick={showDrawer}>
          <div>
            <div role="button" type="primary" tabIndex={0} style={{ cursor: "pointer" }}>
              {allQueryFetch?.data?.rooms?.map((item) => (
                <div className="main">
                  <div
                    className="fetch-title"
                    role="button"
                    onClick={() => setVisibility(true)}
                    onKeyDown={showDrawer}
                    tabIndex={0}
                    style={{ width: "1000px", color: "black" }}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
            </div>
            <form>
              <div>
                <Drawer
                  title="Post Your Queriy"
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
                  <div className="title-tags" style={{ display: "flex" }}>
                    <div className="title-drawer">
                      <h2>Title</h2>
                      <input
                        type="text"
                        style={{
                          width: "22rem",
                          height: "2.7rem",
                          border: "1px solid black",
                          borderRadius: "5px",
                          color: "black",
                          outline: "none",
                        }}
                        // value={allQueryFetch?.data?.rooms[0].title}
                      />
                    </div>
                    <div className="tag-item">
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
                  </div>
                  <div className="change-editor" style={{ marginTop: "1rem" }}>
                    <h2>Text Editor</h2>
                  </div>
                  <Editor
                    className="editor-text"
                    onChange={(e) => {
                      setTemp(e);
                    }}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    wrapperStyle={{
                      width: 760,
                      border: "1px solid black",
                      height: "700",
                      color: "black",
                    }}
                  />
                  {!loader && (
                    <Button type="button" onClick={() => postTheQuery(teess)}>
                      SAVE
                    </Button>
                  )}
                  {loader && (
                    <Button type="button" disabled>
                      Loading...
                    </Button>
                  )}
                  <div style={{ border: "1px solid black", marginTop: "1rem" }}>
                    <div>
                      {allQueryFetch?.data?.rooms.map((item) => (
                        <div
                          className="item-sender"
                          onClick={() => setVisibility(true)}
                          onKeyDown={showDrawer}
                          role="button"
                          tabIndex={0}
                        >
                          {item.queries.map((items) => (
                            <div
                              style={{
                                color: "black",
                                paddingTop: "20px",
                                cursor: "pointer",
                              }}
                            >
                              <li>
                                {items.sender.username}
                                {items.sender.createdAt.split("T")[0]}
                                {items.sender.createdAt.split("T")[1].split(".")[0]}
                                <div style={{ marginLeft: "1rem" }}>{items.text}</div>
                                <div style={{ textAlign: "right" }}>
                                  {/* {"\t------------->"} */}
                                </div>
                              </li>
                            </div>
                          ))}
                        </div>
                        // </div>
                      ))}
                    </div>
                  </div>
                  {/* <div>
                    <h2 style={{ color: "black", marginTop: "1.5rem" }}>Posted Query:-</h2>
                    <div>
                      <div style={{ color: "black" }}>
                        {temp?.blocks?.map((item) => (
                          <div>{item.text}</div>
                        ))}
                      </div>
                    </div>
                  </div> */}
                  {/* <Button type="button" visible={visible} onClick={() => setVisibility(false)}>
                    save
                  </Button> */}
                </Drawer>
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
