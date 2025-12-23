import { Button } from "antd";
import StatusEnum from "../../../../utils/Enum/StatusEnum";
import { DateformatVNTimestamp } from "../../../../utils/Moment/moment";

export class DatabaseColumns {
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
        width: 80,
        responsive: ["md", "lg", "xl"],
      },
      {
        title: "Database",
        dataIndex: "database",
        key: "database",
        width: 200,
        responsive: ["xs", "sm", "md", "lg", "xl"],
        render: (text, record) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>{text}</span>
            <small style={{ color: "#888" }}>
              <b>Dự án:</b> {record.db_root_name}
            </small>
            <small style={{ color: "#888" }}>
              <b>Loại:</b> {record.db_type}
            </small>
          </div>
        ),
      },
      {
        title: "Connect",
        dataIndex: "host",
        key: "host",
        width: 150,
        responsive: ["sm", "md", "lg", "xl"],
        render: (text, record) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <small style={{ color: "#888" }}>
              <b>host:</b> {record.host}
            </small>
            <small style={{ color: "#888" }}>
              <b>user:</b> {record.user}
            </small>
            <small style={{ color: "#888" }}>
              <b>port:</b> {record.port}
            </small>
          </div>
        ),
      },
      // {
      //   title: "Port",
      //   dataIndex: "port",
      //   key: "port",
      //   width: 80,
      //   responsive: ["lg", "xl"],
      // },
      // {
      //   title: "User",
      //   dataIndex: "user",
      //   key: "user",
      //   width: 150,
      //   responsive: ["md", "lg", "xl"],
      // },
      {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
        defaultSortOrder: "descend",
        sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
        render: (text) => DateformatVNTimestamp(new Date(text)),
        width: 150,
        responsive: ["md", "lg", "xl"],
      },
      {
        title: "Actions",
        key: "actions",
        render: (text, record) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              minWidth: "120px",
            }}
          >
            <Button
              type="primary"
              style={{
                backgroundColor:
                  record.status === StatusEnum.ACTIVE ? "#52c41a" : "#ff4d4f",
                borderColor:
                  record.status === StatusEnum.ACTIVE ? "#389e0d" : "#cf1322",
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
              onClick={() => this.handleChangeStatus(record.id)}
            >
              {record.status === StatusEnum.ACTIVE ? "Active" : "Inactive"}
            </Button>

            <Button
              type="primary"
              style={{
                backgroundColor: "#1890ff",
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
              Edit
            </Button>
          </div>
        ),
        width: 130,
        fixed: "right",
        responsive: ["xs", "sm", "md", "lg", "xl"],
      },
    ];
  }
}
