// import { Button } from "antd";
import { useEffect, useState } from "react";
import "./inquiryData.styles.scss";
import { Button, Drawer } from "antd";
import { Editor } from "react-draft-wysiwyg";
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

  const handleShow = () => {
    setShow((current) => !current);
  };

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
        roomId: 2,
        text: `${text}`,
      }),
    });
    // const postQueryData = await JSON.parse(response);
    // console.log(postQueryData);
    setPostTheData(response);
    console.log(postdata);
    console.log(response);
    setVisible(false);
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
                    onClick={handleShow}
                    onKeyDown={handleShow}
                    tabIndex={0}
                  >
                    {item.title}
                  </div>
                  {show && (
                    <div
                      onClick={() => setVisibility(true)}
                      onKeyDown={showDrawer}
                      role="button"
                      tabIndex={0}
                    >
                      {item.queries.map((items) => (
                        <div>
                          {items.text}
                          {"-->"}
                          {items.sender.username}
                          {"--->"}
                          {items.sender.createdAt.split("T")[0]}
                          {"--->"}
                          {items.sender.createdAt.split("T")[1].split(".")[0]}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <form>
              <Drawer
                title="Send Your Queriy"
                placement={placement}
                width={800}
                onClose={() => setVisibility(false)}
                visible={visibility}
                style={{ zIndex: 2000 }}
              >
                <div className="title-drawer">
                  <h2>Title</h2>
                  <input
                    type="text"
                    style={{
                      width: "35rem",
                      height: "2.7rem",
                      border: "1px solid black",
                      borderRadius: "5px",
                      color: "black",
                      outline: "none",
                    }}
                    value={allQueryFetch?.data?.rooms[0].title}
                  />
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
                      width: "75%",
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
                  white_check_mark eyes raised_hands
                </div>
                <div className="change-editor">
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
                    <div style={{ color: "black" }}>
                      {allQueryFetch?.data?.rooms.map((item) => (
                        <div>{item.queries.map((items) => items.text)}</div>
                      ))}
                    </div>
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
              </Drawer>
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
