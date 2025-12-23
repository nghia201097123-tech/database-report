import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./../assets/Scss/Navbar.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenuOpen: false, // Trạng thái ban đầu là đóng menu
    };
  }

  toggleMenu = () => {
    // Đảo ngược trạng thái của menu khi nhấn vào nút hamburger
    this.setState((prevState) => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };

  closeMenu = () => {
    // Đóng menu khi nhấn vào một liên kết
    this.setState({ isMenuOpen: false });
  };

  render() {
    const { isMenuOpen } = this.state;

    return (
      <nav className="navbar">
        <h1>MANAGER</h1>
        <div className="navbar__brand">
          <button className="navbar__toggle" onClick={this.toggleMenu}>
            <span
              className={`navbar__toggle-icon ${isMenuOpen ? "active" : ""}`}
            ></span>
          </button>
        </div>
        <div className={`navbar__links ${isMenuOpen ? "active" : ""}`}>
          <NavLink to="/build" onClick={this.closeMenu}>
            BUILD
          </NavLink>

          <NavLink to="/script-database" onClick={this.closeMenu}>
            DATABASE
          </NavLink>

          <NavLink to="/kafka" onClick={this.closeMenu}>
            KAFKA
          </NavLink>

          <NavLink to="/grpc" onClick={this.closeMenu}>
            GRPC
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default Navbar;
