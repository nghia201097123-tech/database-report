import {
  AppstoreAddOutlined,
  FolderAddOutlined,
  SettingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React, { Component } from "react";

class GRPCHeader extends Component {
  render() {
    const {
      isProjectGRPCDisabled,
      handleProjectClick,
      isServiceGRPCDisabled,
      handleServiceClick,
      isGRPCProfileDisabled,
      handleGRPCProfileClick,
      isLookupGRPCProfileDisabled,
      handleLookupGRPCProfileClick,
    } = this.props;

    return (
      <div className="template-header">
        <Button
          type="primary"
          className={`kafka-button ${isProjectGRPCDisabled ? "disabled" : ""}`}
          onClick={handleProjectClick}
          disabled={isProjectGRPCDisabled}
        >
          <FolderAddOutlined /> Cấu hình Dự Án
        </Button>
        <Button
          type="primary"
          className={`kafka-button ${isServiceGRPCDisabled ? "disabled" : ""}`}
          onClick={handleServiceClick}
          disabled={isServiceGRPCDisabled}
        >
          <AppstoreAddOutlined /> Cấu hình Service
        </Button>
        <Button
          type="primary"
          className={`kafka-button ${isGRPCProfileDisabled ? "disabled" : ""}`}
          onClick={handleGRPCProfileClick}
          disabled={isGRPCProfileDisabled}
        >
          <SettingOutlined /> Thêm mới/Chỉnh sửa GRPC
        </Button>
        <Button
          type="primary"
          className={`kafka-button ${
            isLookupGRPCProfileDisabled ? "disabled" : ""
          }`}
          onClick={handleLookupGRPCProfileClick}
          disabled={isLookupGRPCProfileDisabled}
        >
          <SearchOutlined /> Tra cứu GRPC
        </Button>
      </div>
    );
  }
}

export default GRPCHeader;
