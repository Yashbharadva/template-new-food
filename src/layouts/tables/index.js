/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
Coded by www.creative-tim.com
 =========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Button, Drawer, Radio, Space, Input, Form, Select } from "antd";
import "antd/dist/antd.less";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Option } from "antd/lib/mentions";
import RoleDrop from "./data/roleDrop/roleDrop";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [visibility, setVisibility] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isCreateUser, setCreateUser] = useState("");
  const [isEmail, setEmail] = useState("");
  const [isUsername, setUsername] = useState("");
  const [isPassword, setPassword] = useState("");
  const [isRole, setRole] = useState("");

  const createEmail = isEmail?.target?.value;
  const createUsername = isUsername?.target?.value;
  const createPassword = isPassword?.target?.value;
  // const createRole = isRole;
  const [newRole, setNewRole] = useState();

  const [roleSelect, setRoleSelect] = useState(["Admin", "Salesman", "User"]);
  const [rolePopup, setRolePopup] = useState(false);

  const handleSetRole = (e) => {
    if (e.target.value) {
      setRolePopup(true);
    } else {
      setRolePopup(false);
    }
  };

  // console.log(createUsername, createRole, createEmail, createPassword);

  // const { Option } = Select;

  // const onValue = (value) => {
  //   console.log(`selected ${value}`);
  // };

  // const onSearch = (value) => {
  //   console.log("search:", value);
  // };

  // const onFinish = (values) => {
  //   console.log("Success:", values);
  // };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const showDrawer = () => {
    setVisible(true);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  // const onValue = (value) => {
  //   console.log(`selected ${value}`);
  // };

  // const onSearch = (value) => {
  //   console.log(("search:", value));
  // };

  const createUser = async (username, role, email, password) => {
    setLoader(true);
    let role1;
    if (role === "Admin") {
      role1 = 0;
    } else if (role === "Salesman") {
      role1 = 1;
    } else if (role === "User") {
      role1 = 2;
    }
    const postName = username;
    const postEmail = email;
    const postPassword = password;
    const parsedCreateUser = JSON.parse(localStorage.getItem("user-info"));
    const res = await fetch("https://inquiry-ts.herokuapp.com/admin/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsedCreateUser.data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: postName,
        role: role1,
        email: postEmail,
        password: postPassword,
      }),
    });
    const response = await res.json();
    if (response.status === 0) {
      alert(`${response.message}`);
    } else {
      alert(`${response.message}`);
      window.location.reload(false);
    }
    setLoader(false);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Users Table
                  <Space>
                    <Radio.Group value={placement} onChange={onChange} />
                    <div
                      role="button"
                      className="open-drawer"
                      type="primary"
                      onClick={() => setVisibility(true)}
                      onKeyDown={showDrawer}
                      tabIndex={0}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        marginLeft: "80rem",
                        marginTop: "-1rem",
                      }}
                    >
                      +CreateUser
                    </div>
                  </Space>
                  <form>
                    <Drawer
                      title="Create User"
                      placement={placement}
                      width={800}
                      onClose={() => setVisibility(false)}
                      visible={visibility}
                      style={{ zIndex: "2000" }}
                    >
                      <Form
                        style={{ marginTop: "4rem" }}
                        name="basic"
                        labelCol={{
                          span: 3,
                        }}
                        wrapperCol={{
                          span: 15,
                        }}
                        initialValues={{
                          remember: true,
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                        <Form.Item
                          label="Username"
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                        >
                          <Input
                            onChange={(e) => {
                              setUsername(e);
                            }}
                          />
                        </Form.Item>

                        <Form.Item
                          name="role"
                          label="Role"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            value={newRole}
                            onClick={(e) => {
                              setRole(e);
                            }}
                            onChange={handleSetRole}
                            onFocus={() => setRolePopup(true)}
                            // onSearch={onSearch}
                            filterOption={(name, option) =>
                              option.children.toLowerCase().includes(name.toLowerCase())
                            }
                          >
                            <Option value="Admin">Admin</Option>
                            <Option value="Salesman">Salesman</Option>
                            <Option value="User">User</Option>
                          </Select>
                          {rolePopup &&
                            roleSelect?.map((name) => (
                              <RoleDrop
                                name={name}
                                setRolePopup={setRolePopup}
                                setRoleSelect={setRoleSelect}
                                setNewRole={setNewRole}
                              />
                            ))}
                        </Form.Item>

                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please enter valid email!",
                              type: "email",
                            },
                          ]}
                          onChange={(e) => {
                            setEmail(e);
                          }}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                          ]}
                          onChange={(e) => {
                            setPassword(e);
                          }}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Form>
                      <div>
                        {!loader && (
                          <Button
                            type="button"
                            onClick={() => {
                              createUser(createUsername, newRole, createEmail, createPassword);
                            }}
                          >
                            CREATE
                          </Button>
                        )}
                        {loader && (
                          <Button type="button" disabled>
                            Loading....
                          </Button>
                        )}
                        {/* <Button
                          type="submit"
                          htmlType="submit"
                          onClick={() => {
                            createUser(createUsername, newRole, createEmail, createPassword);
                          }}
                        >
                          Submit
                        </Button> */}
                      </div>
                    </Drawer>
                  </form>
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDTypography />
              <DataTable
                table={{ columns: pColumns, rows: pRows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
