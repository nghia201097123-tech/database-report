import { Button, Col, Input, Tooltip } from "antd";
import React, { Component } from "react";

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

    return (
      <>
        <div className="template-header">
          {store_func_name.is_latest_version === 1 && (
            <Tooltip
              title={
                disabled
                  ? "Tính năng đã bị khoá do Store/Func đã chốt versions!"
                  : ""
              }
            >
              <Button
                type="primary"
                style={{
                  backgroundColor: "#4CAF50",
                  borderColor: "#4CAF50",
                  marginRight: "10px",
                  marginBottom: "1px",
                  color: "#fff",
                  padding: "10px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  opacity: disabled ? 0.5 : 1,
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
                onClick={handleExportStoreFunc}
                disabled={disabled}
              >
                KIỂM TRA
              </Button>

              <Button
                type="primary"
                style={{
                  backgroundColor: "#2196F3",
                  borderColor: "#2196F3",
                  marginRight: "10px",
                  marginBottom: "1px",
                  color: "#fff",
                  padding: "10px 16px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderRadius: "6px",
                  transition: "all 0.3s ease",
                  opacity: disabled ? 0.5 : 1,
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
                onClick={handleExportFileStoreFunc}
                disabled={disabled}
              >
                XUẤT FILE
              </Button>

              <Tooltip
                title={
                  "Khi bạn chốt version này thì ngay lập tức sẽ khoá các store/func bên dưới và tạo ra version mới và chỉ ghi nhận các thay đổi tính từ thời điểm bạn xác nhận!"
                }
                color="red" // Changes the background color of the tooltip to red
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "red",
                    borderColor: "red",
                    color: "#fff",
                    padding: "10px 16px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    borderRadius: "6px",
                    transition: "all 0.3s ease",
                    marginBottom: "1px",
                    opacity: disabled ? 0.5 : 1,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={handleCloneStoreFuncWithConfirmation}
                  disabled={disabled}
                >
                  CHỐT VERSION
                </Button>
              </Tooltip>
            </Tooltip>
          )}

          {store_func_name.is_latest_version === 0 && (
            <Button
              type="primary"
              style={{
                backgroundColor: "#2196F3",
                borderColor: "#2196F3",
                marginRight: "10px",
                marginBottom: "1px",
                color: "#fff",
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: "bold",
                borderRadius: "6px",
                transition: "all 0.3s ease",
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? "not-allowed" : "pointer",
              }}
              onClick={handleExportFileStoreFuncNotLastUpdate}
              disabled={disabled}
            >
              XUẤT FILE
            </Button>
          )}

          <Col xs={24} sm={24} md={12} lg={8} xl={8}>
            <Input
              placeholder="Nhập từ khóa tìm kiếm"
              style={{ width: "100%" }}
              onChange={(e) => handleSelectChange(e.target.value, "search")}
              value={search || ""}
            />
          </Col>
        </div>
      </>
    );
  }
}

export default StoreFuncNameDetailButton;
