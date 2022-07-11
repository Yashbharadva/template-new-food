import React, { useState } from "react";
import "antd/dist/antd.css";
// import button from "assets/theme/components/button";
// import "./index.css";
import { Button, Drawer, Space } from "antd";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CKEditor from "@ckeditor/ckeditor5-react";
// import parse from "html-react-parser";

function InquiryDrawer() {
  const [visible, setVisible] = useState(false);
  const [placement] = useState("right");
  // const [text, setText] = useState("");

  const showDrawer = () => {
    setVisible(true);
  };

  //   const onChange = (e) => {
  //     setPlacement(e.target.value);
  //   };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="drawer-styles">
      <Space>
        <Button type="primary" onClick={showDrawer}>
          <inquiryData />
        </Button>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        className="drawer-with"
        placement={placement}
        width={500}
        // height={200}
        onClose={onClose}
        visible={visible}
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
            {/* <CKEditor
              editor={ClassicEditor}
              data={text}
              onChange={(event, editor) => {
                const data = editor.getData();
                setText(data);
              }}
            /> */}
          </div>
          {/* <p>{parse(text)}</p> */}
        </div>
      </Drawer>
    </div>
  );
}

export default InquiryDrawer;
