import React from 'react';
import Greeting from './Greeting';

export default function App() {
  return (
    <div>
      <Hero />
      <Body />
    </div>
  );
}

function Hero() {
  return (
    <section className="hero is-medium is-dark">
      <div className="hero-body">
        <Greeting />
      </div>
      <div className="hero-foot">
        <Nav />
      </div>
    </section>
  );
}

function Nav() {
  return (
    <nav className="tabs is-centered is-medium">
      <ul>
        <li className="is-active"><a>Professional</a></li>
        <li><a>Blog</a></li>
        <li><a>Projects</a></li>
      </ul>
    </nav>
  );
}

function Body() {
  return (
    <section className="section">
      <div className="container">
        <div className="content">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </section>
  );
}
