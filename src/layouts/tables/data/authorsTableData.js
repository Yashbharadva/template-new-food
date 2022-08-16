import { useEffect, useState } from "react";
// import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Modal } from "antd";
import "./authorTable.scss";

export default function FirstTable() {
  const [customer] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = (item) => {
    setIsModalVisible(false);
  };

  // const [visible, setVisible] = useState(false);
  // const [confirmLoading, setConfirmLoading] = useState(false);
  // const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);

  useEffect(() => {
    // console.log(customer);
  }, [customer]);

  const getUsers = async () => {
    const parsedGetUsers = await JSON.parse(localStorage.getItem("user-info"));
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
    setDeleteLoader(true);
    const parsedDeleteUsers = JSON.parse(localStorage.getItem("user-info"));
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
    setDeleteLoader(false);
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
                  {/* <div
                    role="button"
                    tabIndex={0}
                    style={{
                      marginTop: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      alert('Are you sure you want to delete this user?');
                      deleteUser(item.id);
                    }}
                    onKeyDown={() => {
                      deleteUser(item.id);
                    }}
                  >
                    Delete
                  </div> */}
                  <div
                    style={{
                      marginTop: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      showModal();
                      setDeleteUserId(item.id);
                    }}
                    onKeyDown
                    tabIndex={0}
                    role="button"
                  >
                    Delete
                  </div>
                  <Modal
                    title="Delete this user.."
                    visible={isModalVisible}
                    onOk={() => {
                      deleteUser(deleteUserId);
                    }}
                    onCancel={() => handleCancel(deleteUserId)}
                  >
                    <p>Are you sure you want delete this user..??</p>
                  </Modal>
                </div>
              ))}
            </div>
          </div>
        ),
      },
    ],
  };
}
