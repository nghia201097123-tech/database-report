import { Button } from "antd";
import { DateformatVNTimestamp } from "../../../../utils/Moment/moment";

export class TableNameDetailColumns {
  constructor(handleViewDetails) {
    this.handleViewDetails = handleViewDetails;
  }

  getColumns() {
    return [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 80,
        responsive: ["md", "lg", "xl"],
        render: (text, record, index) => index + 1,
      },
      {
        title: "Table Name",
        dataIndex: "table_name",
        key: "table_name",
        width: 250,
        responsive: ["xs", "sm", "md", "lg", "xl"],
      },
      {
        title: "Action",
        dataIndex: "env",
        key: "env",
        width: 120,
        responsive: ["xs", "sm", "md", "lg", "xl"],
        sorter: (a, b) => a.env.localeCompare(b.env),
        render: (text) => (
          <span
            style={{
              color:
                text === "add"
                  ? "#52c41a"
                  : text === "modify"
                  ? "#faad14"
                  : text === "delete"
                  ? "#ff4d4f"
                  : "inherit",
            }}
          >
            {text}
          </span>
        ),
      },
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
              minWidth: "120px"
            }}
          >
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
                display: "block"
              }}
              onClick={() => this.handleViewDetails(record)}
            >
              <span role="img" aria-label="view">👁️</span> View
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
