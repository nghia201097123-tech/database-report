import { Button, Input } from "antd";
import React, { Component } from "react";
const { TextArea } = Input;

class StoreFuncFormEditNote extends Component {
  render() {
    const {
      input_note,
      handleInputChange,
      handleUpdateNote,
      handleCancelEdit,
      db_name,
      env,
      export_at,
    } = this.props;

    return (
      <div className="project-form">
        <form onSubmit={handleUpdateNote}>
          <h3>{"Cập Nhật Note"}</h3>

          <div style={{ marginBottom: "10px" }}>
            <div>
              <strong>Database:</strong> {db_name}
            </div>
            <div>
              <strong>Environment:</strong> {env}
            </div>
            <div>
              <strong>Export at:</strong> {export_at}
            </div>
          </div>

          <TextArea
            placeholder="Type your input note here"
            value={input_note}
            onChange={(e) => handleInputChange(e, "input_note")}
            rows={4}
          />
          <div style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "8px" }}
            >
              Cập Nhật
            </Button>
            <Button onClick={handleCancelEdit}>Hủy</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default StoreFuncFormEditNote;
