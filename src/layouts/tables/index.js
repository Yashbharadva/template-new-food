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

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();
  const [setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [visibility, setVisibility] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isCreateUser, setCreateUser] = useState("");
  console.log(isCreateUser);
  const [isEmail, setEmail] = useState("");
  const [isUsername, setUsername] = useState("");
  const [isPassword, setPassword] = useState("");
  const [isRole, setRole] = useState("");
  // console.log(isRole);

  const createEmail = isEmail?.target?.value;
  const createUsername = isUsername?.target?.value;
  const createPassword = isPassword?.target?.value;
  const createRole = isRole;

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
    const parsedCreateUser = JSON.parse(localStorage.getItem("user-info"));
    const res = await fetch("https://inquiry-ts.herokuapp.com/admin/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${parsedCreateUser.data.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: `${username}`,
        role: role1,
        email: `${email}`,
        password: `${password}`,
      }),
    });
    const response = await res.json();
    setCreateUser(response);
    console.log("~~~~~~~~~~~~~~~~", response);
    setLoader(false);
    window.location.reload(false);
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
                          value={isRole}
                        >
                          <Select
                            showSearch
                            placeholder="Select a person"
                            optionFilterProp="children"
                            onChange={(e) => {
                              // onValue(e);
                              setRole(e);
                            }}
                            // onSearch={onSearch}
                            filterOption={(input, option) =>
                              option.children.toLowerCase().includes(input.toLowerCase())
                            }
                          >
                            <Option value="Admin">Admin</Option>
                            <Option value="Salesman">Salesman</Option>
                            <Option value="User">User</Option>
                          </Select>
                        </Form.Item>

                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please enter valid email!",
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
                      {/* <div>
                        <div>
                          <div style={{ color: "black" }}>
                            <h4>Email:-</h4>
                            <input
                              onChange={(e) => {
                                setEmail(e);
                              }}
                              type="email"
                              style={{
                                width: "18rem",
                                height: "2.7rem",
                                border: "1px solid black",
                                borderRadius: "5px",
                                color: "black",
                                outline: "none",
                                paddingLeft: "10px",
                              }}
                            />
                          </div>
                          <div style={{ marginLeft: "25rem", marginTop: "-5.4rem" }}>
                            <h4>Select Role:-</h4>
                            <input
                              type="text"
                              style={{
                                width: "18rem",
                                height: "2.7rem",
                                border: "1px solid black",
                                borderRadius: "5px",
                                color: "black",
                                outline: "none",
                                paddingLeft: "10px",
                              }}
                            />
                          </div>
                        </div>
                        <div>
                          <div style={{ color: "black", marginTop: "2rem" }}>
                            <h4>Username:-</h4>
                            <input
                              type="text"
                              onChange={(e) => {
                                setUsername(e);
                              }}
                              style={{
                                width: "18rem",
                                height: "2.7rem",
                                border: "1px solid black",
                                borderRadius: "5px",
                                color: "black",
                                outline: "none",
                                paddingLeft: "10px",
                              }}
                            />
                          </div>
                          <div style={{ marginLeft: "25rem", marginTop: "-5.4rem" }}>
                            <h4>Password:-</h4>
                            <input
                              type="password"
                              onChange={(e) => {
                                setPassword(e);
                              }}
                              style={{
                                width: "18rem",
                                height: "2.7rem",
                                border: "1px solid black",
                                borderRadius: "5px",
                                color: "black",
                                outline: "none",
                                paddingLeft: "10px",
                              }}
                            />
                          </div>
                        </div>
                      </div> */}
                      {/* <button type="button" tabIndex={0} style={{ marginTop: "2rem" }}>
                        Create
                      </button> */}
                      <div>
                        {!loader && (
                          <Button
                            type="button"
                            onClick={() => {
                              createUser(createUsername, createRole, createEmail, createPassword);
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
