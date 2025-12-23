import {
  DatabaseOutlined,
  FunctionOutlined,
  FolderAddOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React, { Component } from "react";

class ScriptDatabaseHeader extends Component {
  render() {
    const {
      isDBRootDisabled,
      isDatabaseDisabled,
      isStoreFuncDisabled,
      isTableNameDisabled,
      handleDBRootClick,
      handleDatabaseClick,
      handleStoreFuncClick,
      handleTableNameClick,
    } = this.props;
    return (
      <div className="template-header">
        <Button
          type="primary"
          className={`kafka-button ${isDBRootDisabled ? "disabled" : ""}`}
          onClick={handleDBRootClick}
          disabled={isDBRootDisabled}
        >
          <FolderAddOutlined /> Cấu hình Dự Án
        </Button>
        <Button
          type="primary"
          className={`kafka-button ${isDatabaseDisabled ? "disabled" : ""}`}
          onClick={handleDatabaseClick}
          disabled={isDatabaseDisabled}
        >
          <DatabaseOutlined /> Cấu hình Database
        </Button>
        <Button
          type="primary"
          className={`kafka-button ${isStoreFuncDisabled ? "disabled" : ""}`}
          onClick={handleStoreFuncClick}
          disabled={isStoreFuncDisabled}
        >
          <FunctionOutlined /> Kiểm tra Store/Func
        </Button>
        <Button
          type="primary"
          className={`kafka-button ${isTableNameDisabled ? "disabled" : ""}`}
          onClick={handleTableNameClick}
          disabled={isTableNameDisabled}
        >
          <TableOutlined /> Kiểm tra Table
        </Button>
      </div>
    );
  }
}

export default ScriptDatabaseHeader;
