// import { Button } from "antd";
import { useEffect, useState } from "react";
import "./inquiryData.styles.scss";
import { Button, Drawer, Space } from "antd";
import { Editor } from "react-draft-wysiwyg";
import MDInput from "components/MDInput";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TagPopupC from "./tagDrop";
// import { Button, Drawer, Space } from "antd";
// import { Button, Drawer, Space } from "antd";
// import { Radio, Space } from "antd";
// import InquiryDrawer from "./inquiryDrawer";
// import { Skeleton } from "@mui/material";
import InquiryDrawer from "./inquiryDrawer";
// import InquiryDrawer from "./inquiryDrawer";

export default function data() {
  const [customer] = useState([]);
  const [setIsLoading] = useState(true);
  const [mainData] = useState([]);
  const [setVisible] = useState(false);
  // setAllQueryFetch
  const [allQueryFetch, setAllQueryFetch] = useState({});
  const [show, setShow] = useState(false);
  // const [setPostMainData] = useState({});
  const [placement] = useState("right");
  const [visibility, setVisibility] = useState(false);
  const [tags, setTags] = useState(["Hello"]);
  const [temp, setTemp] = useState("");
  const [postdata, setPostTheData] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const teess = temp?.blocks?.map((item) => item.text);

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

  const handleSearchQuery = async () => {
    const parsedSearchQuery = await JSON.parse(localStorage.getItem("user-info"));
    // console.log(searchQuery);
    fetch(`https://inquiry-ts.herokuapp.com/user/search-query?term=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${parsedSearchQuery.data.accessToken}`,
      },
      method: "GET",
    })
      .then(async (res) => {
        const resJSON = await res.json();
        console.log("--------->>>>>>", resJSON);
        setSearchResults(resJSON);
        setShow(!show);
      })
      .catch((err) => {
        console.log(err);
      });
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
    console.log(allQueryData);
    setAllQueryFetch(allQueryData);
  };
  // console.log(allQueryFetch);

  useEffect(() => {
    getAllQuery();
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
    // const postQueryData = await JSON.parse(response);
    // console.log(postQueryData);
    setPostTheData(response);
    console.log(postdata);
    console.log(response);
    setVisibility(false);
  };

  return {
    columns: [{ Header: "inquiry", accessor: "inquiry", width: "40%", align: "left" }],
    rows: [
      {
        inquiry: (
          // <Button onClick={showDrawer}>
          <div>
            <div
              role="button"
              type="primary"
              // onClick={toggleShow}
              // onKeyDown={toggleShow}
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              {allQueryFetch?.data?.rooms.map((item) => (
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
                  {/* {show && (
                    <div
                      className="item-sender"
                      onClick={() => setVisibility(true)}
                      onKeyDown={showDrawer}
                      role="button"
                      tabIndex={0}
                    >
                      {item.queries.map((items) => (
                        <div>
                          <li>
                            {items.text}
                            {"\t--->"}
                            {items.sender.username}
                            <div style={{ textAlign: "right" }}>
                              {items.sender.createdAt.split("T")[0]}
                              {"\t--->"}
                              {items.sender.createdAt.split("T")[1].split(".")[0]}
                            </div>
                          </li>
                        </div>
                      ))}
                    </div>
                  )} */}
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
                      <MDInput type="search" onChange={(e) => setSearchQuery(e.target.value)} />
                      <Button type="button" onClick={handleSearchQuery}>
                        Search
                      </Button>
                      {show && (
                        <div className="drop-drawer-search">
                          <div className="border-drawer-drop" style={{ color: "black" }}>
                            {/* {searchResults?.data?.rooms?.queries?.map((item) => (
                              <div
                                className="drawer-search"
                                key={item.id}
                                style={{ color: "black" }}
                              >
                                {item.text}
                              </div>
                            ))} */}
                            {searchResults?.data?.rooms[0]?.queries?.map((item) => (
                              <div>{item.text}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Space>
                  }
                >
                  {/* <input
                    type="search"
                    placeholder="search here.."
                    style={{ border: "1px solid grey" }}
                  /> */}
                  <div
                    className="title-tags"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="title-drawer">
                      <h2>Title</h2>
                      <input
                        type="text"
                        style={{
                          width: "15rem",
                          height: "2.7rem",
                          border: "1px solid black",
                          borderRadius: "5px",
                          color: "black",
                          outline: "none",
                        }}
                        value={allQueryFetch?.data?.rooms[0].title}
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
                  <div>
                    <h2 style={{ color: "black", marginTop: "1.5rem" }}>Query:-</h2>
                    <div>
                      {/* <div style={{ color: "black" }}>
                        {allQueryFetch?.data?.rooms.map((item) => (
                          <div>{item.queries.map((items) => items.text)}</div>
                        ))}
                      </div> */}
                      {allQueryFetch?.data?.rooms.map((item) => (
                        <div className="main">
                          {/* <div
                    className="fetch-title"
                    role="button"
                    onClick={handleShow}
                    onKeyDown={handleShow}
                    tabIndex={0}
                    style={{ width: "1000px" }}
                  >
                    {item.title}
                  </div> */}
                          <div
                            className="item-sender"
                            onClick={() => setVisibility(true)}
                            onKeyDown={showDrawer}
                            role="button"
                            tabIndex={0}
                          >
                            {item.queries.map((items) => (
                              <div style={{ color: "black" }}>
                                <li>
                                  {items.text}
                                  {"\t--->"}
                                  {items.sender.username}
                                  <div style={{ textAlign: "right" }}>
                                    {items.sender.createdAt.split("T")[0]}
                                    {"\t--->"}
                                    {items.sender.createdAt.split("T")[1].split(".")[0]}
                                  </div>
                                </li>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 style={{ color: "black", marginTop: "1.5rem" }}>Posted Query:-</h2>
                    <div>
                      <div style={{ color: "black" }}>
                        {temp?.blocks?.map((item) => (
                          <div>{item.text}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button type="button" onClick={() => postTheQuery(teess)}>
                    SAVE
                  </Button>
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
