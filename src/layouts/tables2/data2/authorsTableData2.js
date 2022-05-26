import { useEffect, useState } from "react";
import "./authorTable2.scss";
import { FcApproval } from "react-icons/fc";
import check from "../../../assets/images/check.png";
import close from "../../../assets/images/close.png";

export default function data() {
  const [store, setStore] = useState([]);
  const getStore = async () => {
    const parsedStore = JSON.parse(localStorage.getItem("user-info"));
    const response = await fetch("https://cerv-api.herokuapp.com/admin/users/2", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${parsedStore.token}`,
      },
    });
    const catererData = await response.json();
    // console.log(customersData.caterer);
    setStore(catererData.store);
  };

  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    console.log(store);
  }, [store]);

  return {
    columns: [
      { Header: "Caterer", accessor: "caterer", width: "45%", align: "left" },
      { Header: "Phone Number", accessor: "Phone_Number", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "action", accessor: "action", align: "center", width: "15%" },
      { Header: "Approved", accessor: "Approved", align: "center" },
      { Header: "Rejected", accessor: "Rejected", align: "center" },
    ],

    rows: [
      {
        caterer: (
          <div>
            {store.map((item) => (
              <div key={item.id} item={item}>
                <img src={item.caterer.image} alt="" />
                <div className="name-caterer">{item.caterer.name}</div>
                <div className="email-caterer">{item.caterer.email}</div>
              </div>
            ))}
          </div>
        ),
        Phone_Number: (
          <div>
            {store.map((item) => (
              <div key={item.id} item={item}>
                <div className="phone-caterer">{item.caterer.phone_number}</div>
              </div>
            ))}
          </div>
        ),
        status: (
          <div>
            {store.map((item) => (
              <div key={item.id} item={item}>
                <div className="active-caterer">{item.caterer.is_active ? "online" : "offile"}</div>
              </div>
            ))}
          </div>
        ),
        action: (
          <div>
            {store.map((item) => (
              <div key={item.id} item={item}>
                {item.is_approved === 0 ? (
                  <div className="image-and-logo" key={item.id} item={item}>
                    <img src={check} alt="" />
                    <img src={close} alt="" />
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
                  <div className="approve-img" key={item.id} item={item}>
                    <FcApproval size="1.5em" />
                  </div>
                ) : (
                  <div className="not-approve" key={item.id} item={item}>
                    -
                  </div>
                )}
              </div>
            ))}
          </div>
        ),
        Rejected: (
          <div>
            {store.map((item) => (
              <div key={item.id} item={item}>
                {item.is_approved === 1 ? (
                  <div className="reject-empty" key={item.id} item={item}>
                    -
                  </div>
                ) : (
                  <div className="reject-button">
                    <div className="button">Reject</div>
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
