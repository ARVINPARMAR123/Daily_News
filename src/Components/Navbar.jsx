import React, { Component } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/", end: true },
  { label: "About", to: "/about" },
  { label: "Business", to: "/business" },
  { label: "Entertainment", to: "/entertainment" },
  { label: "General", to: "/general" },
  { label: "Health", to: "/health" },
  { label: "Science", to: "/science" },
  { label: "Sports", to: "/sports" },
  { label: "Technology", to: "/technology" },
];

export default class Navbar extends Component {
  render() {
    return (
      <header className="site-header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid site-header__inner">
            <NavLink className="navbar-brand brand-lockup" to="/">
              <span className="brand-lockup__mark">DN</span>
              <span>
                <span className="brand-lockup__title">DailyNews</span>
                <span className="brand-lockup__subtitle">Top headlines, cleaner reading</span>
              </span>
            </NavLink>
            <button
              className="navbar-toggler site-header__toggle"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <ul className="navbar-nav site-nav mb-2 mb-lg-0">
                {navItems.map((item) => (
                  <li className="nav-item" key={item.to}>
                    <NavLink
                      end={item.end}
                      className={({ isActive }) => `nav-link${isActive ? " is-active" : ""}`}
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
