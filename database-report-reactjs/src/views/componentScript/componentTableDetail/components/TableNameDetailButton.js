import { Button, Col, Input, Tooltip } from "antd";
import React, { Component } from "react";

class TableNameDetailButton extends Component {
  render() {
    const {
      disabled,
      handleExportTableName,
      handleCloneTableNameWithConfirmation,
      handleSelectChange,
      search,
    } = this.props;

    return (
      <>
        {console.log(disabled)}
        <div className="template-header">
          {!disabled && (
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
                onClick={handleExportTableName}
                disabled={disabled}
              >
                KIỂM TRA
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
                  onClick={handleCloneTableNameWithConfirmation}
                  disabled={disabled}
                >
                  CHỐT VERSION
                </Button>
              </Tooltip>
            </Tooltip>
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

export default TableNameDetailButton;
