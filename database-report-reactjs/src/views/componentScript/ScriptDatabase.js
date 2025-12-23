import { Component } from "react";
import "../../assets/Scss/templates/Header.scss";
import ScriptDatabaseHeader from "./ScriptDatabaseHeader";
import DBRoot from "./componentDBRoot/DBRoot";
import Database from "./componentDatabase/Database";
import StoreFunc from "./componentStoreFunc/StoreFunc";
import TableName from "./componentTable/TableName";

class ScriptDatabase extends Component {
  state = {
    isDBRootDisabled: localStorage.getItem("isDBRootDisabled") === "true",
    isDatabaseDisabled: localStorage.getItem("isDatabaseDisabled") === "true",
    isStoreFuncDisabled: localStorage.getItem("isStoreFuncDisabled") === "true",
    isTableNameDisabled: localStorage.getItem("isTableNameDisabled") === "true",
  };

  handleDBRootClick = () => {
    this.setState(
      {
        isDBRootDisabled: true,
        isDatabaseDisabled: false,
        isStoreFuncDisabled: false,
        isTableNameDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleDatabaseClick = () => {
    this.setState(
      {
        isDBRootDisabled: false,
        isDatabaseDisabled: true,
        isStoreFuncDisabled: false,
        isTableNameDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleStoreFuncClick = () => {
    this.setState(
      {
        isDBRootDisabled: false,
        isDatabaseDisabled: false,
        isStoreFuncDisabled: true,
        isTableNameDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleTableNameClick = () => {
    this.setState(
      {
        isDBRootDisabled: false,
        isDatabaseDisabled: false,
        isStoreFuncDisabled: false,
        isTableNameDisabled: true,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  saveStateToLocalStorage = () => {
    localStorage.setItem("isDBRootDisabled", this.state.isDBRootDisabled);
    localStorage.setItem("isDatabaseDisabled", this.state.isDatabaseDisabled);
    localStorage.setItem("isStoreFuncDisabled", this.state.isStoreFuncDisabled);
    localStorage.setItem("isTableNameDisabled", this.state.isTableNameDisabled);
  };

  render() {
    return (
      <div className="template-container">
        <div className="kafka-content">
          <ScriptDatabaseHeader
            isDBRootDisabled={this.state.isDBRootDisabled}
            isDatabaseDisabled={this.state.isDatabaseDisabled}
            isStoreFuncDisabled={this.state.isStoreFuncDisabled}
            isTableNameDisabled={this.state.isTableNameDisabled}
            handleDBRootClick={this.handleDBRootClick}
            handleDatabaseClick={this.handleDatabaseClick}
            handleStoreFuncClick={this.handleStoreFuncClick}
            handleTableNameClick={this.handleTableNameClick}
          />

          {this.state.isDBRootDisabled && <DBRoot />}
          {this.state.isDatabaseDisabled && <Database />}
          {this.state.isStoreFuncDisabled && <StoreFunc />}
          {this.state.isTableNameDisabled && <TableName />}
        </div>
      </div>
    );
  }
}

export default ScriptDatabase;
