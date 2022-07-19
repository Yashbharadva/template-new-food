// import { Button } from "antd";
import { useEffect, useState } from "react";
import "./inquiryData.styles.scss";
import { Link } from "react-router-dom";
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
  const [setPostMainData] = useState({});
  // const [isShow, setIsShow] = useState(false);
  // const [show, setShow] = useState(true);
  // const [mainData] = useState({});
  // const [placement] = useState("right");

  const showDrawer = () => {
    setVisible(true);
  };

  const handleShow = () => {
    setShow((current) => !current);
  };

  const postQuery = async () => {
    const parsedPost = JSON.parse(localStorage.getItem("user-info"));
    console.log(parsedPost);
    const response = await fetch("https://inquiry-ts.herokuapp.com/user/post-query-room", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsedPost.data.accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        users: [
          { id: 1, username: "vatsal19", email: "vatsalp.tcs@gmail.com" },
          { id: 2, username: "gaurang", email: "gaurangpatel.tcs@gmail.com" },
        ],
      }),
    });
    const postData = await response.json();
    console.log(postData);
    setPostMainData(postData);
  };
  // console.log(postMainData);

  useEffect(() => {
    postQuery();
  }, []);

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

  return {
    columns: [
      { Header: "inquiry", accessor: "inquiry", width: "40%", align: "left" },
      // { Header: "phone number", accessor: "phone", align: "left" },
      // { Header: "status", accessor: "status", align: "center" },
    ],
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
              {/* <div className="main">
                <div
                  className="fetch-title"
                  role="button"
                  onClick={handleShow}
                  onKeyDown={handleShow}
                  tabIndex={0}
                >
                  {allQueryFetch?.data?.rooms?.map((item) => (
                    <div
                      className="fetch-title"
                      role="button"
                      onClick={handleShow}
                      onKeyDown={handleShow}
                      tabIndex={0}
                    >
                      {item.title}
                    </div>
                  ))}
                  {show && <div>{item.description}</div>} */}
              {/* <div onClick={handleNot} onKeyDown={handleNot} tabIndex={0} role="button"> */}
              {/* </div> */}
              {/* </div> */}
              {/* </div> */}
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
                  {show && <Link to="/allquery">{item.description}</Link>}
                </div>
              ))}
            </div>
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
