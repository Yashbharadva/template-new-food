// import { Button } from "antd";
import { useEffect, useState } from "react";
import "./inquiryData.styles.scss";
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
  // const [placement] = useState("right");

  const showDrawer = () => {
    setVisible(true);
  };

  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };

  // const [placement, setPlacement] = useState("right");

  // const showDrawer = () => {
  //   setVisible(true);
  // };

  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };

  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };

  // const onClose = () => {
  //   setVisible(false);
  //   // console.log("close");
  // };

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
            {/* <div>
              <button
                // role="button"
                // tabIndex={0}
                type="button"
                className="event"
                // onClick={showDrawer}
                // onKeyDown={showDrawer}
              />
            </div> */}
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
