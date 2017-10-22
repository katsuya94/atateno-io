import React from "react";
import { Route, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import Greeting from "./Greeting";
import About from "./About";
import Blog from "./Blog";
import Projects from "./Projects";

export default function App() {
  return (
    <div>
      <Hero />
      <Nav />
      <Body />
    </div>
  );
}

function Hero() {
  return (
    <div>
      <section className="app-hero app-hero-real hero is-dark">
        <div className="hero-body">
          <Greeting />
        </div>
      </section>
      <div className="app-hero hero is-dark">
        <div className="hero-body">
          <p className="app-greeting is-size-3" />
        </div>
      </div>
    </div>
  );
}

function NavItem({ children, ...routeProps }) {
  return (
    <Route {...routeProps}>
      {({ match }) => (
        <li className={match ? "is-active" : ""}>
          <Link to={routeProps.path}>{children}</Link>
        </li>
      )}
    </Route>
  );
}

NavItem.propTypes = {
  children: PropTypes.string.isRequired
};

function Nav() {
  return (
    <div className="app-nav">
      <div className="tabs is-centered is-medium">
        <ul>
          <NavItem exact path="/">
            About
          </NavItem>
          <NavItem path="/blog">Blog</NavItem>
          <NavItem path="/projects">Projects</NavItem>
        </ul>
      </div>
      <div className="gradient" />
    </div>
  );
}

function Body() {
  return (
    <section className="app-body section">
      <Route exact path="/" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/projects" component={Projects} />
    </section>
  );
}
