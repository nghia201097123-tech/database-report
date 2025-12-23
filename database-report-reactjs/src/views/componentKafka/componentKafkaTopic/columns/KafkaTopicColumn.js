import { Button } from "antd";
import StatusEnum from "../../../../utils/Enum/StatusEnum";
import { DateformatVNTimestamp } from "../../../../utils/Moment/moment";

class KafkaTopicColumns {
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
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 250,
        responsive: ["xs", "sm", "md", "lg", "xl"],
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
                backgroundColor: record.status === StatusEnum.ACTIVE ? "#52c41a" : "#ff4d4f",
                borderColor: record.status === StatusEnum.ACTIVE ? "#389e0d" : "#cf1322",
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
                display: "block"
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

export default KafkaTopicColumns;
