// import { Button } from "antd";
import { useEffect, useState } from "react";
import "./inquiryData.styles.scss";
// import { Button, Drawer, Space } from "antd";
// import { Radio, Space } from "antd";
// import InquiryDrawer from "./inquiryDrawer";
import { Skeleton } from "@mui/material";
import InquiryDrawer from "./inquiryDrawer";
// import InquiryDrawer from "./inquiryDrawer";

export default function data(showDrawer) {
  const [customer] = useState([]);
  // const [placement, setPlacement] = useState("right");

  // const [visible, setVisible] = useState(false);
  // const [placement] = useState("right");

  // const showDrawer = () => {
  //   setVisible(true);
  // };

  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };

  // const onClose = () => {
  //   setVisible(false);
  // };

  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };

  // const onClose = () => {
  //   setVisible(false);
  // };

  // const [searchInput, setSearchInput] = useState("");
  // const [APIData, setAPIData] = useState([]);
  // const [filteredResults, setFilteredResults] = useState([])
  // isLoading
  const [isLoading, setIsLoading] = useState(true);
  // const getCustomers = async () => {
  //   const parsedUser = JSON.parse(localStorage.getItem("user-info"));
  //   const response = await fetch("https://cerv-api.herokuapp.com/admin/users/1", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${parsedUser.token}`,
  //     },
  //   });
  //   const customersData = await response.json();
  //   // console.log(customersData.customers);
  //   setCustomer(customersData.customers);
  // };

  // const searchItems = (searchValue) => {
  //   setSearchInput(searchValue)
  //   if (searchInput !== ""){
  //     const filteredData = APIData.filter((item) => {
  //       return Object.values(item).join("").toLowerCase().includes(searchInput.toLowerCase())
  //     })
  //     setFilteredResults(filteredData)
  //   }
  //   else{
  //     setFilteredResults(APIData)
  //   }
  // }

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
      { Header: "phone number", accessor: "phone", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
    ],
    rows: [
      {
        inquiry: (
          // <Button onClick={showDrawer}>suyd</Button>
          <div>
            {/* <div>
              <Space>
                <Button type="primary" onClick={showDrawer}>
                  Open
                </Button>
              </Space>
              <Drawer
                placement={placement}
                width={700}
                onClose={onClose}
                visible={visible}
                extra={
                  <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="primary" onClick={onClose}>
                      OK
                    </Button>
                  </Space>
                }
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Drawer>
            </div> */}
            {/* <div>
              {isLoading
                ? [...Array(4)].map((i) => (
                    <div className="customer-effect" key={i}>
                      <div className="image-effect">
                        <Skeleton animation="wave" variant="circular" width="50px" height="50px" />
                      </div>
                      <h3>
                        <Skeleton width="100px" height="25px" />
                      </h3>
                      <h4>
                        <Skeleton width="150px" height="25px" />
                      </h4>
                      <br />
                    </div>
                  ))
                : customer.map((item) => (
                    <div className="customer-info" key={item.id} item={item}>
                      <img src={item.image} alt="" />
                      <h3 className="name">{item.name}</h3>
                      <h4 className="email">{item.email}</h4>
                      <br />
                    </div>
                  ))}
            </div> */}
          </div>
        ),
        phone: (
          <div>
            <InquiryDrawer onClick={showDrawer}>
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
            </InquiryDrawer>
          </div>
        ),
        status: (
          <div>
            {/* {isLoading
              ? [...Array(4)].map((i) => (
                  <div className="active-info" key={i}>
                    <h3>
                      <Skeleton width="75px" height="35px" />
                    </h3>
                    <br />
                  </div>
                ))
              : customer.map((item) => (
                  <div key={item.id} item={item}>
                    <div className="active">{item.is_active ? "Online" : "Offline"}</div>
                    <br />
                  </div>
                ))} */}
          </div>
        ),
      },
    ],
  };
}
