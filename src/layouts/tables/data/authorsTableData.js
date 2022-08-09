import { useEffect, useState } from "react";
import "./authorTable.scss";
// import { Skeleton } from "@mui/material";

export default function FirstTable() {
  const [customer] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState({});
  // const [loader, setLoader] = useState(false);
  // const [deleteLoader, setDeleteLoader] = useState(false);
  // console.log(loader);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     console.log(isLoading);
  //   });
  // });

  useEffect(() => {
    // console.log(customer);
  }, [customer]);

  const getUsers = async () => {
    const parsedGetUsers = JSON.parse(localStorage.getItem("user-info"));
    const response = await fetch("https://inquiry-ts.herokuapp.com/admin/get-users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${parsedGetUsers.data.accessToken}`,
      },
    });
    const getusers = await response.json();
    console.log(getusers);
    setAdminUsers(getusers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    // deleteLoader(true);
    const parsedDeleteUsers = JSON.parse(localStorage.getItem("user-info"));
    console.log(parsedDeleteUsers);
    console.log(id);
    const responseDelete = await fetch("https://inquiry-ts.herokuapp.com/admin/delete-user", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${parsedDeleteUsers.data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
      }),
    });
    const response = await responseDelete.json();
    console.log(response);
    // setDeleteLoader(false);
    window.location.reload(false);
  };

  const getRole = (idx) => {
    switch (idx) {
      case 0:
        return "Admin";
      case 1:
        return "Salesman";
      case 2:
        return "User";
      default:
        return "Some Role";
    }
  };

  return {
    columns: [
      { Header: "Name", accessor: "name", width: "30%", align: "left" },
      { Header: "Role", accessor: "role", width: "10%", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Delete", accessor: "delete", align: "center" },
    ],
    rows: [
      {
        name: (
          <div>
            {adminUsers?.data?.map((item) => (
              <div style={{ marginTop: "20px" }}>{item.username}</div>
            ))}
          </div>
        ),
        role: (
          <div>
            {adminUsers?.data?.map((obj) => (
              <div style={{ marginTop: "20px" }}>{getRole(obj.role)}</div>
            ))}
          </div>
        ),
        status: (
          <div>
            {adminUsers?.data?.map((items) => (
              <div style={{ marginTop: "20px" }}>{items.is_active ? "Online" : "Offline"}</div>
            ))}
          </div>
        ),
        delete: (
          <div>
            <div>
              {adminUsers?.data?.map((item) => (
                <div>
                  <div
                    role="button"
                    tabIndex={0}
                    style={{
                      marginTop: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      deleteUser(item.id);
                    }}
                    onKeyDown={() => {
                      deleteUser(item.id);
                    }}
                  >
                    Delete
                  </div>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  };
}
