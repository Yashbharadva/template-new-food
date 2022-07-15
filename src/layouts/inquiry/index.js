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
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

import inquiryData from "layouts/inquiry/data/inquiryData";
import inquiry from "layouts/inquiry/data/inquiry";
import "antd/dist/antd.css";
import { Button, Drawer, Radio, Space } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import MDButton from "components/MDButton";
import "./index.css";

function Inquiry() {
  const { columns, rows } = inquiryData();
  const { columns: pColumns, rows: pRows } = inquiry();
  const [setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [tags, setTags] = useState("[Hello]");
  const [visibility, setVisibility] = useState(false);
  const [title, setTitle] = useState("");
  const [editor, setEditor] = useState("");

  // const [dataEditor] = useState([]);
  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setTags([...tags, e.target.value]);
        e.target.value = "";
      }
    }
  };

  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onChange = (e) => {
    setPlacement(e.target.value);
  };

  const handleTextChange = (e) => {
    setTitle(e.target.value);
  };

  const handleEditorChange = (e) => {
    setEditor(e.target.value);
  };

  const handleSaveClick = () => {
    localStorage.setItem("title", title);
    // localStorage.setItem("tag", tags);
    localStorage.setItem("editor", editor);
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
                  Inquiry Table
                  <Space>
                    <Radio.Group value={placement} onChange={onChange}>
                      {/* <Radio value="top">top</Radio>
                    <Radio value="right">right</Radio>
                    <Radio value="bottom">bottom</Radio>
                    <Radio value="left">left</Radio> */}
                    </Radio.Group>
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
                      +CreateInquiry
                    </div>
                  </Space>
                  <Drawer
                    title="Drawer with extra actions"
                    placement={placement}
                    width={800}
                    onClose={() => setVisibility(false)}
                    visible={visibility}
                    extra={
                      <Space>
                        <Button onClick={() => setVisibility(false)}>Cancel</Button>
                        <Button type="primary" onClick={() => setVisibility(false)}>
                          OK
                        </Button>
                      </Space>
                    }
                    style={{ zIndex: 2000 }}
                  >
                    <div className="title-drawer">
                      <h2>Title</h2>
                      <input
                        type="text"
                        style={{
                          width: "35rem",
                          height: "2.7rem",
                          border: "1px solid black",
                          borderRadius: "5px",
                          color: "black",
                          outline: "none",
                        }}
                        onChange={handleTextChange}
                      />
                    </div>
                    <div className="tag-item" style={{ marginTop: "5rem" }}>
                      <h2>Tags</h2>
                      <div className="tag-container">
                        {tags.map((tag) => (
                          <div className="tag">
                            {tag}
                            <span
                              onClick={() => removeTag(tag)}
                              onKeyDown={() => removeTag(tag)}
                              role="button"
                              tabIndex={0}
                            >
                              X
                            </span>
                          </div>
                        ))}
                        <input onKeyDown={addTag} />
                      </div>
                    </div>
                    <div className="change-editor">
                      <h2>Text Editor</h2>
                    </div>
                    <Editor
                      className="editor-text"
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      wrapperStyle={{
                        width: 760,
                        border: "1px solid black",
                        height: "700",
                        color: "black",
                      }}
                      onChange={handleEditorChange}
                    />
                    <Button type="button" onClick={handleSaveClick}>
                      SAVE
                    </Button>
                    {/* <div className="Apply">{temp?.blocks?.inlineStyleRanges}</div> */}
                  </Drawer>
                </MDTypography>

                {/* <MDTypography
                  className="create-inquiry"
                  variant="h6"
                  // ml={160}
                  // mt={-3.3}
                  color="white"
                >
                  +Craete Inquiry
                </MDTypography> */}
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

export default Inquiry;
