import { Button, Input, Tooltip } from "antd";
import React, { Component } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "../../../../assets/Scss/components/ActionButtons.scss";

class StoreFuncNameDetailButton extends Component {
  render() {
    const {
      disabled,
      store_func_name,
      handleExportStoreFunc,
      handleExportFileStoreFunc,
      handleExportFileStoreFuncNotLastUpdate,
      handleCloneStoreFuncWithConfirmation,
      handleSelectChange,
      search,
    } = this.props;

    const isLatestVersion = store_func_name?.is_latest_version === 1;

    return (
      <div className="action-buttons">
        {isLatestVersion && (
          <div className="action-buttons__group">
            <Tooltip
              title={
                disabled
                  ? "Tính năng đã bị khoá do Store/Func đã chốt versions!"
                  : "Kiểm tra và phát hiện các thay đổi Store Procedure/Function"
              }
            >
              <Button
                type="primary"
                className="btn-action btn-action--check"
                onClick={handleExportStoreFunc}
                disabled={disabled}
              >
                <span className="btn-icon">🔍</span>
                KIỂM TRA
              </Button>
            </Tooltip>

            <Tooltip title="Xuất các Store/Func đã chọn ra file SQL">
              <Button
                type="primary"
                className="btn-action btn-action--export"
                onClick={handleExportFileStoreFunc}
                disabled={disabled}
              >
                <span className="btn-icon">📁</span>
                XUẤT FILE
              </Button>
            </Tooltip>

            <Tooltip
              title="Khi bạn chốt version này thì ngay lập tức sẽ khoá các store/func bên dưới và tạo ra version mới và chỉ ghi nhận các thay đổi tính từ thời điểm bạn xác nhận!"
              color="red"
            >
              <Button
                type="primary"
                className="btn-action btn-action--lock"
                onClick={handleCloneStoreFuncWithConfirmation}
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
              onClick={handleExportFileStoreFuncNotLastUpdate}
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

export default StoreFuncNameDetailButton;
