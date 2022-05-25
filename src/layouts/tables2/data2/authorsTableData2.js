import { useEffect, useState } from "react";
import "./authorTable2.scss";
// import { FcApproval } from "react-icons/fc";

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
      { Header: "function", accessor: "function", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Approved", accessor: "Approved", align: "center" },
      { Header: "Reject", accessor: "Reject", align: "center" },
    ],

    rows: [
      {
        caterer: (
          <div>
            {store.map((item) => (
              <div key={item.id} item={item}>
                <div className="name-caterer">{item.name}</div>
              </div>
            ))}
          </div>
        ),
        function: (
          <div>
            {store.map((item) => (
              <div key={item.id} item={item}>
                <div className="name-caterer">{item.name}</div>
              </div>
            ))}
          </div>
        ),
        Approved: (
          <div>
            {store.map((item) => (
              <div key={item.id} item={item}>
                <button type="button" onClick={item.is_approved ? "1" : "0"}>
                  Approve
                </button>
              </div>
            ))}
          </div>
        ),
        Reject: (
          <div>
            {store.map((item) => (
              <div key={item.id} item={item}>
                <button type="button">Reject</button>
              </div>
            ))}
          </div>
        ),
      },
    ],
  };
}
