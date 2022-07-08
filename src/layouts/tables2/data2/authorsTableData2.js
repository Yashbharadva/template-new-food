import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import "./authorTable2.scss";
import check from "../../../assets/images/check.png";
import close from "../../../assets/images/close.png";
import mark from "../../../assets/images/mark.png";
import cancel from "../../../assets/images/cancel.png";

export default function data() {
  const [store] = useState([]);
  const [approve, setApprove] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // // const [reject, setReject] = useState(true);
  // // const [toggle, setToggle] = useState();
  // // const [visible, setVisible] = useState(true);
  // const getStore = async () => {
  //   const parsedStore = JSON.parse(localStorage.getItem("user-info"));
  //   const response = await fetch("https://cerv-api.herokuapp.com/admin/users/2", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${parsedStore.token}`,
  //     },
  //   });
  //   const catererData = await response.json();
  //   // console.log(customersData.caterer);
  //   setStore(catererData.store);
  // };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    });
  }, []);

  const onPressApprove = () => {
    console.log("Approve");
    setApprove(true);
  };

  const onPressReject = () => {
    console.log("Reject");
    setApprove(false);
  };

  // useEffect(() => {
  //   getStore();
  // }, []);

  // useEffect(() => {
  //   console.log(store);
  // }, [store]);

  return {
    columns: [
      { Header: "Caterer", accessor: "caterer", width: "45%", align: "left" },
      { Header: "Phone Number", accessor: "Phone_Number", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center", width: "15%" },
      { Header: "Approved", accessor: "Approved", align: "center" },
    ],

    rows: [
      {
        caterer: (
          <div>
            {isLoading
              ? [...Array(2)].map((i) => (
                  <div className="caterer-effect" key={i}>
                    <div className="image-caterer-effect">
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
              : store.map((item) => (
                  <div key={item.id} item={item}>
                    <img src={item.caterer.image} alt="" />
                    <h3 className="name-caterer">{item.caterer.name}</h3>
                    <h4 className="email-caterer">{item.caterer.email}</h4>
                  </div>
                ))}
          </div>
        ),
        Phone_Number: (
          <div>
            {isLoading
              ? [...Array(2)].map((i) => (
                  <div className="phone-number-effect" key={i}>
                    <h3>
                      <Skeleton width="150px" height="25px" />
                    </h3>
                  </div>
                ))
              : store.map((item) => (
                  <div key={item.id} item={item}>
                    <div className="phone-caterer">{item.caterer.phone_number}</div>
                  </div>
                ))}
          </div>
        ),
        status: (
          <div>
            {isLoading
              ? [...Array(2)].map((i) => (
                  <div className="active-effect-onoff" key={i}>
                    <h3>
                      <Skeleton width="75px" height="35px" />
                    </h3>
                  </div>
                ))
              : store.map((item) => (
                  <div key={item.id} item={item}>
                    <div className="active-caterer">
                      {item.caterer.is_active ? "online" : "offline"}
                    </div>
                  </div>
                ))}
          </div>
        ),
        action: (
          <div>
            {store.map((item) => (
              <div className="dash-and-image" key={item.id} item={item}>
                {item.is_approved === 0 ? (
                  <div className="image-and-logo" key={item.id} item={item}>
                    {approve == null ? (
                      <>
                        <input type="image" src={check} alt="" onClick={onPressApprove} />
                        <input type="image" src={close} alt="" onClick={onPressReject} />
                      </>
                    ) : (
                      <div className="dash"> - </div>
                    )}
                  </div>
                ) : (
                  <div className="dash"> - </div>
                )}
              </div>
            ))}
          </div>
        ),
        Approved: (
          <div>
            {store.map((item) => (
              <div key={item.id} item={item}>
                {item.is_approved === 1 ? (
                  <div className="approve">
                    <div className="approve-img" key={item.id} item={item}>
                      <input type="image" src={mark} alt="" />
                    </div>
                  </div>
                ) : (
                  <div>
                    {approve !== null && (
                      <div className="no-approve">
                        <div className="not-approve" key={item.id} item={item}>
                          {approve ? (
                            <input type="image" src={mark} alt="" />
                          ) : (
                            <input type="image" src={cancel} alt="" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ),
      },
    ],
  };
}
