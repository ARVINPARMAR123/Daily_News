import { Component } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import News from "./Components/News";

const footerGroups = [
  {
    heading: "Browse",
    links: [
      { label: "Top stories", to: "/" },
      { label: "About", to: "/about" },
      { label: "Business", to: "/business" },
      { label: "Technology", to: "/technology" },
    ],
  },
  {
    heading: "Sections",
    links: [
      { label: "Science", to: "/science" },
      { label: "Health", to: "/health" },
      { label: "Sports", to: "/sports" },
      { label: "Entertainment", to: "/entertainment" },
    ],
  },
];

export default class App extends Component {
  pageSize = 12;

  state = {
    progress: 0
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    const currentYear = new Date().getFullYear();

    return (
      <div className="app-shell">
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
          <Navbar />
          <LoadingBar
            color="#ff6b2c"
            height={4}
            progress={this.state.progress}
          />
          <main className="app-main">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route
                path="/"
                element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} category="general" />}
              />
              <Route
                path="/business"
                element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} category="business" />}
              />
              <Route
                path="/entertainment"
                element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} category="entertainment" />}
              />
              <Route
                path="/general"
                element={<News setProgress={this.setProgress} key="general-feed" pageSize={this.pageSize} category="general" />}
              />
              <Route
                path="/health"
                element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} category="health" />}
              />
              <Route
                path="/science"
                element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} category="science" />}
              />
              <Route
                path="/sports"
                element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} category="sports" />}
              />
              <Route
                path="/technology"
                element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} category="technology" />}
              />
              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </main>
          <footer className="site-footer">
            <div className="container">
              <div className="site-footer__content">
                <div className="site-footer__brand">
                  <p className="site-footer__eyebrow">Daily briefing</p>
                  <h2 className="site-footer__title">Stay close to the stories that shape the day.</h2>
                  <p className="site-footer__description">
                    DailyNews keeps major headlines organized into fast, readable category views with clear sources and direct links to full coverage.
                  </p>
                </div>

                <div className="site-footer__nav">
                  {footerGroups.map((group) => (
                    <div className="site-footer__group" key={group.heading}>
                      <h3 className="site-footer__heading">{group.heading}</h3>
                      <ul className="site-footer__list">
                        {group.links.map((link) => (
                          <li key={link.to}>
                            <Link className="site-footer__link" to={link.to}>
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="site-footer__meta">
                <p>© {currentYear} DailyNews</p>
                <p>Live headlines appear when available. Sample stories are used as a safe fallback.</p>
              </div>
            </div>
          </footer>
        </BrowserRouter>
      </div>
    );
  }
}
