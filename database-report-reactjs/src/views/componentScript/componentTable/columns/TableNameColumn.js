import { Button } from "antd";
import { DateformatVNTimestamp } from "../../../../utils/Moment/moment";

export class TableNameColumns {
  constructor(handleRedirectStoreFuncDetail, handleEditNote) {
    this.handleRedirectStoreFuncDetail = handleRedirectStoreFuncDetail;
    this.handleEditNote = handleEditNote;
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
        dataIndex: "db_name",
        key: "db_name",
        width: 250,
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
        title: "Export At",
        dataIndex: "export_at",
        key: "export_at",
        defaultSortOrder: "descend",
        sorter: (a, b) => new Date(a.export_at) - new Date(b.export_at),
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
              disabled={true}
              type="primary"
              style={{
                backgroundColor:
                  record.is_latest_version === 1 ? "#faad14" : "#ff4d4f",
                borderColor:
                  record.is_latest_version === 1 ? "#d48806" : "#cf1322",
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
            >
              {record.is_latest_version === 1 ? "Mới nhất" : "Cũ"}
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
              onClick={() => this.handleRedirectStoreFuncDetail(record)}
            >
              {record.is_latest_version === 1 ? "Kiểm tra" : "Xem"}
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
