import { Component } from "react";
import { useNavigate } from "react-router-dom";

import KafkaProfile from "./componentKafkaProfile/KafkaProfile";
import KafkaTopic from "./componentKafkaTopic/KafkaTopic";
import Project from "./componentProject/Project";
import Service from "./componentService/Service";
import KafkaHeader from "./KafkaHeader";

function withNavigation(Component) {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

class Kafka extends Component {
  state = {
    isProjectKafkaDisabled:
      localStorage.getItem("isProjectKafkaDisabled") === "true",
    isServiceKafkaDisabled:
      localStorage.getItem("isServiceKafkaDisabled") === "true",
    isKafkaProfileDisabled:
      localStorage.getItem("isKafkaProfileDisabled") === "true",
    isKafkaTopicDisabled:
      localStorage.getItem("isKafkaTopicDisabled") === "true",
    isLookupKafkaTopicDisabled:
      localStorage.getItem("isLookupKafkaTopicDisabled") === "true",
  };

  handleProjectClick = () => {
    this.setState(
      {
        isProjectKafkaDisabled: true,
        isServiceKafkaDisabled: false,
        isKafkaProfileDisabled: false,
        isKafkaTopicDisabled: false,
        isLookupKafkaTopicDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleServiceClick = () => {
    this.setState(
      {
        isProjectKafkaDisabled: false,
        isServiceKafkaDisabled: true,
        isKafkaProfileDisabled: false,
        isKafkaTopicDisabled: false,
        isLookupKafkaTopicDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleKafkaProfileClick = () => {
    this.setState(
      {
        isProjectKafkaDisabled: false,
        isServiceKafkaDisabled: false,
        isKafkaProfileDisabled: true,
        isKafkaTopicDisabled: false,
        isLookupKafkaTopicDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleKafkaTopicClick = () => {
    this.setState(
      {
        isProjectKafkaDisabled: false,
        isServiceKafkaDisabled: false,
        isKafkaProfileDisabled: false,
        isKafkaTopicDisabled: true,
        isLookupKafkaTopicDisabled: false,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  handleLookupKafkaTopicClick = () => {
    this.setState(
      {
        isProjectKafkaDisabled: false,
        isServiceKafkaDisabled: false,
        isKafkaProfileDisabled: false,
        isKafkaTopicDisabled: false,
        isLookupKafkaTopicDisabled: true,
      },
      () => {
        this.saveStateToLocalStorage();
      }
    );
  };

  saveStateToLocalStorage = () => {
    localStorage.setItem(
      "isProjectKafkaDisabled",
      this.state.isProjectKafkaDisabled
    );
    localStorage.setItem(
      "isServiceKafkaDisabled",
      this.state.isServiceKafkaDisabled
    );
    localStorage.setItem(
      "isKafkaProfileDisabled",
      this.state.isKafkaProfileDisabled
    );
    localStorage.setItem(
      "isKafkaTopicDisabled",
      this.state.isKafkaTopicDisabled
    );
    localStorage.setItem(
      "isLookupKafkaTopicDisabled",
      this.state.isLookupKafkaTopicDisabled
    );
  };

  render() {
    return (
      <div className="template-container">
        <div className="kafka-content">
          <KafkaHeader
            isProjectKafkaDisabled={this.state.isProjectKafkaDisabled}
            handleProjectClick={this.handleProjectClick}
            isServiceKafkaDisabled={this.state.isServiceKafkaDisabled}
            handleServiceClick={this.handleServiceClick}
            isKafkaProfileDisabled={this.state.isKafkaProfileDisabled}
            handleKafkaProfileClick={this.handleKafkaProfileClick}
            isKafkaTopicDisabled={this.state.isKafkaTopicDisabled}
            handleKafkaTopicClick={this.handleKafkaTopicClick}
            isLookupKafkaTopicDisabled={this.state.isLookupKafkaTopicDisabled}
            handleLookupKafkaTopicClick={this.handleLookupKafkaTopicClick}
          />
          {this.state.isProjectKafkaDisabled && <Project />}
          {this.state.isServiceKafkaDisabled && <Service />}
          {this.state.isKafkaProfileDisabled && <KafkaProfile />}
          {this.state.isKafkaTopicDisabled && <KafkaTopic />}
          {this.state.isLookupKafkaTopicDisabled &&
            this.props.navigate(`/kafka-search`, {
              replace: false,
            })}
        </div>
      </div>
    );
  }
}

export default withNavigation(Kafka);
