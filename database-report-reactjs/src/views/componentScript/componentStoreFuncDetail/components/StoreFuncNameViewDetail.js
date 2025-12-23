import { Modal } from "antd";
import React, { Component } from "react";

class StoreFuncNameViewDetail extends Component {
  render() {
    const { visible, selectedRecord, handleCancel } = this.props;
    return (
      <>
        <Modal
          open={visible}
          onCancel={handleCancel}
          footer={null}
          width="80%"
          style={{
            maxHeight: "80vh", // Chiều cao tối đa của modal
            overflow: "hidden", // Ẩn cuộn bên ngoài
          }}
        >
          <div
            style={{
              maxHeight: "70vh", // Chiều cao tối đa cho phần nội dung
              overflowY: "auto", // Cho phép cuộn dọc nếu cần
              padding: "20px",
              wordWrap: "break-word", // Cắt từ dài nếu cần thiết
            }}
          >
            {selectedRecord && (
              <div
                style={{
                  whiteSpace: "pre-wrap", // Giữ nguyên định dạng văn bản
                }}
                dangerouslySetInnerHTML={{
                  __html: selectedRecord.json_change,
                }}
              />
            )}
          </div>
        </Modal>
      </>
    );
  }
}

export default StoreFuncNameViewDetail;
