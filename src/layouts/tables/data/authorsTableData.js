import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import "./authorTable.scss";

export default function data() {
  const [customer, setCustomer] = useState([]);
  const getCustomers = async () => {
    const parsedUser = JSON.parse(localStorage.getItem("user-info"));
    const response = await fetch("https://cerv-api.herokuapp.com/admin/users/1", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${parsedUser.token}`,
      },
    });
    const customersData = await response.json();
    // console.log(customersData.customers);
    setCustomer(customersData.customers);
  };

  useEffect(() => {
    getCustomers();
  }, []);

  useEffect(() => {
    console.log(customer);
  }, [customer]);

  return {
    columns: [
      { Header: "Customers", accessor: "customers", width: "40%", align: "left" },
      { Header: "phone number", accessor: "phone", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: [
      {
        customers: (
          <div>
            {customer.map((item) => (
              <Skeleton key={item.id} item={item}>
                <img src={item.image} alt="" />
                <div className="name">{item.name}</div>
                <div className="email">{item.email}</div>
                <br />
              </Skeleton>
            ))}
          </div>
        ),
        phone: (
          <div>
            {customer.map((item) => (
              <div key={item.id} item={item}>
                <div className="phone-number">{item.phone_number}</div>
                <br />
              </div>
            ))}
          </div>
        ),
        status: (
          <div>
            {customer.map((item) => (
              <div key={item.id} item={item}>
                <div className="active">{item.is_active ? "Online" : "Offline"}</div>
                <br />
              </div>
            ))}
          </div>
        ),
      },
    ],
  };
}
