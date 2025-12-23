import { Component } from "react";
import { useNavigate } from "react-router-dom";

import Project from "./../componentKafka/componentProject/Project";
import Service from "./../componentKafka/componentService/Service";
import GRPCProfile from "./componentGrpcProfile/componentGRPCProfile";
import GRPCHeader from "./GRPCHeader";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class GRPC extends Component {
  state = {
    isProjectGRPCDisabled:
      localStorage.getItem("isProjectGRPCDisabled") === "true",
    isServiceGRPCDisabled:
      localStorage.getItem("isServiceGRPCDisabled") === "true",
    isGRPCProfileDisabled:
      localStorage.getItem("isGRPCProfileDisabled") === "true",
    isLookupGRPCProfileDisabled:
      localStorage.getItem("isLookupGRPCProfileDisabled") === "true",
  };

  handleProjectClick = () => {
    this.setState(
      {
        isProjectGRPCDisabled: true,
        isServiceGRPCDisabled: false,
        isGRPCProfileDisabled: false,
        isLookupGRPCProfileDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleServiceClick = () => {
    this.setState(
      {
        isProjectGRPCDisabled: false,
        isServiceGRPCDisabled: true,
        isGRPCProfileDisabled: false,
        isLookupGRPCProfileDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleGRPCProfileClick = () => {
    this.setState(
      {
        isProjectGRPCDisabled: false,
        isServiceGRPCDisabled: false,
        isGRPCProfileDisabled: true,
        isLookupGRPCProfileDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleLookupGRPCProfileClick = () => {
    this.setState(
      {
        isProjectGRPCDisabled: false,
        isServiceGRPCDisabled: false,
        isGRPCProfileDisabled: false,
        isLookupGRPCProfileDisabled: true,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  saveStateToLocalStorage = () => {
    localStorage.setItem(
      "isProjectGRPCDisabled",
      this.state.isProjectGRPCDisabled
    );
    localStorage.setItem(
      "isServiceGRPCDisabled",
      this.state.isServiceGRPCDisabled
    );
    localStorage.setItem(
      "isGRPCProfileDisabled",
      this.state.isGRPCProfileDisabled
    );
    localStorage.setItem(
      "isLookupGRPCProfileDisabled",
      this.state.isLookupGRPCProfileDisabled
    );
  };

  render() {
    return (
      <div className="template-container">
        <div className="kafka-content">
          <GRPCHeader
            isProjectGRPCDisabled={this.state.isProjectGRPCDisabled}
            handleProjectClick={this.handleProjectClick}
            isServiceGRPCDisabled={this.state.isServiceGRPCDisabled}
            handleServiceClick={this.handleServiceClick}
            isGRPCProfileDisabled={this.state.isGRPCProfileDisabled}
            handleGRPCProfileClick={this.handleGRPCProfileClick}
            isLookupGRPCProfileDisabled={this.state.isLookupGRPCProfileDisabled}
            handleLookupGRPCProfileClick={this.handleLookupGRPCProfileClick}
          />
          {this.state.isProjectGRPCDisabled && <Project />}
          {this.state.isServiceGRPCDisabled && <Service />}
          {this.state.isGRPCProfileDisabled && <GRPCProfile />}
          {this.state.isLookupGRPCProfileDisabled &&
            this.props.navigate(`/grpc-search`, {
              replace: false,
            })}
        </div>
      </div>
    );
  }
}

export default withNavigation(GRPC);
