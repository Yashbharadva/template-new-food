import { useEffect, useState } from "react";
import "./authorTable.scss";
// import { Skeleton } from "@mui/material";

export default function AllQuery() {
  const [customer] = useState([]);
  // const [searchInput, setSearchInput] = useState("");
  // const [APIData, setAPIData] = useState([]);
  // const [filteredResults, setFilteredResults] = useState([]);
  const [setIsLoading] = useState(true);
  const [allQueryFetch, setAllQueryFetch] = useState({});

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
  });

  // useEffect(() => {
  //   getCustomers();
  // }, []);

  useEffect(() => {
    // console.log(customer);
  }, [customer]);

  return {
    columns: [
      { Header: "All-Queries", accessor: "AllQueries", width: "40%", align: "left" },
      // { Header: "phone number", accessor: "phone", align: "left" },
      // { Header: "status", accessor: "status", align: "center" },
    ],
    rows: [
      {
        AllQueries: (
          <div>
            {allQueryFetch?.data?.rooms[0]?.queries?.map((item) => (
              <div>{item.text}</div>
            ))}
          </div>
        ),
        phone: (
          <div>
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
