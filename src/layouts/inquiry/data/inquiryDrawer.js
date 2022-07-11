import React, { useState } from "react";
import "antd/dist/antd.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import button from "assets/theme/components/button";
// import "./index.css";
import { Button, Drawer, Space } from "antd";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import parse from "html-react-parser";

function InquiryDrawer() {
  const [visible, setVisible] = useState(false);
  const [placement] = useState("right");
  // setMainData
  const [mainData] = useState([]);
  // const [text, setText] = useState("");

  const showDrawer = () => {
    setVisible(true);
  };

  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };

  const onClose = () => {
    setVisible(false);
  };

  // const getQuery = async () => {
  //   const parsedQuery = await JSON.parse(localStorage.getItem("user-info"));
  //   // console.log(parsedQuery.data);
  //   const response = await fetch("https://inquiry-ts.herokuapp.com/user/post-query-room", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${parsedQuery.data.accessToken}`,
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ query: "1nd query of the day" }),
  //   });
  //   const QueryData = await response.json();
  //   // console.log(QueryData);
  //   setMainData(QueryData);
  // };
  // // console.log(mainData);

  // useEffect(() => {
  //   getQuery();
  // }, []);

  return (
    <div className="drawer-styles">
      <Space>
        <div
          role="button"
          type="primary"
          onClick={showDrawer}
          onKeyDown={showDrawer}
          tabIndex={0}
          style={{ cursor: "pointer" }}
        >
          {mainData?.data?.text}1st query of the day
        </div>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        className="drawer-with"
        placement={placement}
        width={window.innerWidth > 1000 ? 800 : "auto"}
        onClose={onClose}
        visible={visible}
        style={{ zIndex: "1" }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="main-drawer">
          <div className="box-drawer">Text Editor</div>
          <div className="editor">
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              wrapperStyle={{ width: 800, border: "1px solid black", height: "800" }}
            />
            {/* <div>
              <CKEditor
                editor={ClassicEditor}
                data={text}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setText(data);
                }}
              />
            </div> */}
            {/* <p>{parse(text)}</p> */}
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default InquiryDrawer;
