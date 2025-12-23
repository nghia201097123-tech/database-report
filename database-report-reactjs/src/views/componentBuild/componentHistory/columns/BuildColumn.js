import { Button } from "antd";

import { DateformatVNTimestamp } from "../../../../utils/Moment/moment";
import BuildStatusEnum from "./../../../../utils/Enum/BuildStatusEnum";

export class BuildColumns {
  constructor() {
    this.handleChangeStatus = null;
    this.handleEdit = null;
  }

  setHandlers(handleChangeStatus, handleEdit) {
    this.handleChangeStatus = handleChangeStatus;
    this.handleEdit = handleEdit;
  }

  getColumns() {
    return [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 50,
        responsive: ["md", "lg"],
      },
      {
        title: "Create At",
        dataIndex: "build_at",
        key: "build_at",
        defaultSortOrder: "descend",
        sorter: (a, b) => new Date(a.export_at) - new Date(b.export_at),
        render: (text) => DateformatVNTimestamp(new Date(text)),
        width: 100,
        responsive: ["xs", "sm", "md", "lg"],
      },
      {
        title: "Content",
        dataIndex: "content",
        key: "content",
        render: (text) => {
          if (!text) return ""; // Tránh lỗi khi text bị null hoặc undefined

          const match = text.match(/<h2[^>]*>(.*?)<\/h2>/);

          if (match && match[1]) {
            return match[1].replace(/<[^>]+>/g, ""); // Loại bỏ thẻ HTML bên trong
          }

          return text; // Trả về nội dung gốc nếu không có thẻ <h2>
        },
        width: 250,
        responsive: ["xs", "sm", "md", "lg"],
      },

      {
        title: "Status",
        key: "status",
        render: (text, record) => {
          // Định nghĩa màu sắc cho từng trạng thái
          const statusColors = {
            [BuildStatusEnum.PENDING]: "#faad14", // Màu vàng
            [BuildStatusEnum.PROCESS]: "#1890ff", // Màu xanh dương
            [BuildStatusEnum.DONE]: "#52c41a", // Màu xanh lá
            [BuildStatusEnum.REJECT]: "#ff4d4f", // Màu đỏ
            [BuildStatusEnum.SMALLER]: "#ffcc00", // Màu cho trạng thái "Nhỏ Hơn"
          };

          return (
            <div style={{ display: "flex", gap: "4px" }}>
              <Button
                type="primary"
                style={{
                  backgroundColor:
                    record.status === BuildStatusEnum.PENDING
                      ? statusColors[BuildStatusEnum.PENDING]
                      : "#d9d9d9", // Màu vàng hoặc xám nhạt
                  color: "#ffffff",
                  height: "32px",
                  fontSize: "13px",
                  fontWeight: "500",
                  borderRadius: "4px",
                  boxShadow: "0 2px 0 rgba(0,0,0,0.045)",
                  width: "100%",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
                onClick={() => this.handleChangeStatus(record.id, "pending")}
              >
                {record.status === BuildStatusEnum.PENDING
                  ? record.status
                  : "pending"}
              </Button>
              <Button
                type="primary"
                style={{
                  backgroundColor:
                    record.status === BuildStatusEnum.PROCESS
                      ? statusColors[BuildStatusEnum.PROCESS]
                      : "#d9d9d9", // Màu xanh dương hoặc xám nhạt
                  borderColor: "#d9d9d9", // Màu xám nhạt
                  color: "#ffffff",
                  height: "32px",
                  fontSize: "13px",
                  fontWeight: "500",
                  borderRadius: "4px",
                  boxShadow: "0 2px 0 rgba(0,0,0,0.045)",
                  width: "100%",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
                onClick={() => this.handleChangeStatus(record.id, "process")}
              >
                {record.status === BuildStatusEnum.PROCESS
                  ? record.status
                  : "process"}
              </Button>
              <Button
                type="primary"
                style={{
                  backgroundColor:
                    record.status === BuildStatusEnum.DONE
                      ? statusColors[BuildStatusEnum.DONE]
                      : "#d9d9d9", // Màu xanh lá hoặc xám nhạt
                  color: "#ffffff",
                  height: "32px",
                  fontSize: "13px",
                  fontWeight: "500",
                  borderRadius: "4px",
                  boxShadow: "0 2px 0 rgba(0,0,0,0.045)",
                  width: "100%",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
                onClick={() => this.handleChangeStatus(record.id, "done")}
              >
                {record.status === BuildStatusEnum.DONE
                  ? record.status
                  : "done"}
              </Button>
              <Button
                type="primary"
                style={{
                  backgroundColor:
                    record.status === BuildStatusEnum.REJECT
                      ? statusColors[BuildStatusEnum.REJECT]
                      : "#d9d9d9", // Màu đỏ hoặc xám nhạt
                  color: "#ffffff",
                  height: "32px",
                  fontSize: "13px",
                  fontWeight: "500",
                  borderRadius: "4px",
                  boxShadow: "0 2px 0 rgba(0,0,0,0.045)",
                  width: "100%",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
                onClick={() => this.handleChangeStatus(record.id, "reject")}
              >
                {record.status === BuildStatusEnum.REJECT
                  ? record.status
                  : "reject"}
              </Button>
            </div>
          );
        },
        width: 100,
        fixed: "right",
        responsive: ["md", "lg"],
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => {
          return (
            <div style={{ display: "flex", gap: "4px" }}>
              <Button
                type="primary"
                style={{
                  backgroundColor:
                    record.status === BuildStatusEnum.REJECT
                      ? "#d9d9d9"
                      : "#1890ff", // Màu đỏ hoặc xám nhạt
                  borderColor: "#096dd9",
                  color: "#ffffff",
                  height: "32px",
                  fontSize: "13px",
                  fontWeight: "500",
                  borderRadius: "4px",
                  boxShadow: "0 2px 0 rgba(0,0,0,0.045)",
                  width: "100%",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
                onClick={() => this.handleEdit(record)}
              >
                {record.status === BuildStatusEnum.REJECT ||
                record.status === BuildStatusEnum.DONE
                  ? "View"
                  : "Edit"}
              </Button>
            </div>
          );
        },
        width: 30,
        fixed: "right",
        responsive: ["xs", "sm", "md", "lg"],
      },
    ];
  }
}
