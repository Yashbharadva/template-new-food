import React, { useState } from "react";
import "antd/dist/antd.css";
// import button from "assets/theme/components/button";
// import "./index.css";
import { Button, Drawer, Space } from "antd";

function InquiryDrawer() {
  const [visible, setVisible] = useState(false);
  const [placement] = useState("right");

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
          <button className="button-bold" type="button" title="bold">
            B
          </button>
        </div>
      </Drawer>
    </div>
  );
}

export default InquiryDrawer;
