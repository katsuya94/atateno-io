import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
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

function Nav() {
  return (
    <div className="tabs is-centered is-medium">
      <ul>
        <li><Link to="/">Professional</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/projects">Projects</Link></li>
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
