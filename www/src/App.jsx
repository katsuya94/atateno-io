import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Greeting from './Greeting';
import Professional from './Professional';
import Blog from './Blog';
import Projects from './Projects';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Hero />
        <Nav />
        <Body />
      </div>
    </BrowserRouter>
  );
}

function Hero() {
  return (
    <section className="hero is-dark">
      <div className="hero-body">
        <div className="container">
          <Greeting />
        </div>
      </div>
    </section>
  );
}

function NavItem({ children, ...routeProps }) {
  return (
    <Route {...routeProps}>
      {({ match }) => (
        <li className={match ? 'is-active' : ''}>
          <Link to={routeProps.path}>{children}</Link>
        </li>
      )}
    </Route>
  );
}

NavItem.propTypes = {
  children: PropTypes.string.isRequired,
};


function Nav() {
  return (
    <div className="tabs is-centered is-medium">
      <ul>
        <NavItem exact path="/">Professional</NavItem>
        <NavItem path="/blog">Blog</NavItem>
        <NavItem path="/projects">Projects</NavItem>
      </ul>
    </div>
  );
}

function Body() {
  return (
    <section className="section">
      <Route exact path="/" component={Professional} />
      <Route path="/blog" component={Blog} />
      <Route path="/projects" component={Projects} />
    </section>
  );
}
