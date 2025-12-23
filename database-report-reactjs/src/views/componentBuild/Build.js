import { Component } from "react";
import BuildHeader from "./BuildHeader";
import CreateBuild from "./componentCreate/CreateBuild";
import BuildHistory from "./componentHistory/BuildHistory";


class Build extends Component {
  state = {
    isCreateBuildDisabled:
      localStorage.getItem("isCreateBuildDisabled") === "true",

    isHistoryBuildDisabled:
      localStorage.getItem("isHistoryBuildDisabled") === "true",
  };

  handleCreateBuildClick = () => {
    this.setState(
      {
        isCreateBuildDisabled: true,
        isHistoryBuildDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleHistoryBuildClick = () => {
    this.setState(
      {
        isCreateBuildDisabled: false,
        isHistoryBuildDisabled: true,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  saveStateToLocalStorage = () => {
    localStorage.setItem(
      "isCreateBuildDisabled",
      this.state.isCreateBuildDisabled
    );
    localStorage.setItem(
      "isHistoryBuildDisabled",
      this.state.isHistoryBuildDisabled
    );
  };

  render() {
    return (
      <div className="template-container">
        <div className="kafka-content">
          <BuildHeader
            isCreateBuildDisabled={this.state.isCreateBuildDisabled}
            handleCreateBuildClick={this.handleCreateBuildClick}
            isHistoryBuildDisabled={this.state.isHistoryBuildDisabled}
            handleHistoryBuildClick={this.handleHistoryBuildClick}
          />
          {this.state.isCreateBuildDisabled && <CreateBuild />}
          {this.state.isHistoryBuildDisabled && <BuildHistory />}
        </div>
      </div>
    );
  }
}

export default Build;
