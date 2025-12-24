import { Button, Input, Tooltip } from "antd";
import React, { Component } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "../../../../assets/Scss/components/ActionButtons.scss";

class TableNameDetailButton extends Component {
  render() {
    const {
      disabled,
      table_name,
      handleExportTableName,
      handleExportFileTableName,
      handleExportFileTableNameNotLastUpdate,
      handleCloneTableNameWithConfirmation,
      handleSelectChange,
      search,
    } = this.props;

    const isLatestVersion = table_name?.is_latest_version === 1;

    return (
      <div className="action-buttons">
        {isLatestVersion && (
          <div className="action-buttons__group">
            <Tooltip
              title={
                disabled
                  ? "Tính năng đã bị khoá do Table đã chốt versions!"
                  : "Kiểm tra và phát hiện các thay đổi schema của table"
              }
            >
              <Button
                type="primary"
                className="btn-action btn-action--check"
                onClick={handleExportTableName}
                disabled={disabled}
              >
                <span className="btn-icon">🔍</span>
                KIỂM TRA
              </Button>
            </Tooltip>

            <Tooltip title="Xuất các table đã chọn ra file SQL">
              <Button
                type="primary"
                className="btn-action btn-action--export"
                onClick={handleExportFileTableName}
                disabled={disabled}
              >
                <span className="btn-icon">📁</span>
                XUẤT FILE
              </Button>
            </Tooltip>

            <Tooltip
              title="Khi bạn chốt version này thì ngay lập tức sẽ khoá các tables bên dưới và tạo ra version mới và chỉ ghi nhận các thay đổi tính từ thời điểm bạn xác nhận!"
              color="red"
            >
              <Button
                type="primary"
                className="btn-action btn-action--lock"
                onClick={handleCloneTableNameWithConfirmation}
                disabled={disabled}
              >
                <span className="btn-icon">🔒</span>
                CHỐT VERSION
              </Button>
            </Tooltip>
          </div>
        )}

        {!isLatestVersion && (
          <Tooltip title="Xuất file từ version cũ">
            <Button
              type="primary"
              className="btn-action btn-action--export"
              onClick={handleExportFileTableNameNotLastUpdate}
              disabled={disabled}
            >
              <span className="btn-icon">📁</span>
              XUẤT FILE
            </Button>
          </Tooltip>
        )}

        <div className="action-buttons__search">
          <Input
            placeholder="Nhập từ khóa tìm kiếm..."
            prefix={<SearchOutlined />}
            onChange={(e) => handleSelectChange(e.target.value, "search")}
            value={search || ""}
            allowClear
          />
        </div>
      </div>
    );
  }
}

export default TableNameDetailButton;
