import React from "react";
import { Link } from "react-router-dom";

function Title() {
  return (
    <div className="app-title">
      <h1 className="title is-size-1">Adrien Tateno</h1>
      <h2 className="subtitle is-size-3">
        Create <b className="has-text-primary">systems</b>, not goals.
      </h2>
    </div>
  );
}

function Technologies() {
  return (
    <div className="app-technologies">
      <a href="//kubernetes.io" target="_blank" rel="noopener noreferrer">
        <img src="/assets/kubernetes.svg" alt="Kubernetes" />
      </a>
      <a href="//kafka.apache.org" target="_blank" rel="noopener noreferrer">
        <img src="/assets/kafka.svg" alt="Kafka" />
      </a>
      <a href="//reactjs.org" target="_blank" rel="noopener noreferrer">
        <img src="/assets/react.svg" alt="React" />
      </a>
      <a href="//rubyonrails.org" target="_blank" rel="noopener noreferrer">
        <img src="/assets/rails.svg" alt="Ruby on Rails" />
      </a>
      <a href="//racket-lang.org" target="_blank" rel="noopener noreferrer">
        <img src="/assets/racket.svg" alt="Racket" />
      </a>
    </div>
  );
}

function Preferences() {
  return (
    <div className="app-preferences">
      <div className="preference">
        <h3>Likes</h3>
        <ul>
          <li>Functional Programming</li>
          <li>DevOps</li>
          <li>Domain-Specific Languages</li>
          <li>Fermented Foods</li>
        </ul>
      </div>
      <div className="preference">
        <h3>Dislikes</h3>
        <ul>
          <li>Side Effects</li>
          <li>Losing Time to Bad Tools</li>
          <li>Bad Domain-Specific Languages</li>
          <li>Forks (like, the silverware)</li>
        </ul>
      </div>
    </div>
  );
}

function Social() {
  return (
    <div className="app-social">
      <a
        href="//github.com/katsuya94"
        target="_blank"
        rel="noopener noreferrer"
        className="button is-large"
      >
        <span className="icon">
          <i className="fa fa-github" />
        </span>
      </a>
      <a
        href="//www.linkedin.com/in/atateno"
        target="_blank"
        rel="noopener noreferrer"
        className="button is-large"
      >
        <span className="icon">
          <i className="fa fa-linkedin" />
        </span>
      </a>
      <Link to="/blog" className="button is-large">
        <span className="icon">
          <i className="fa fa-book" />
        </span>
      </Link>
    </div>
  );
}

export default function About() {
  return (
    <div className="app-experience container">
      <Title />
      <Technologies />
      <Preferences />
      <Social />
    </div>
  );
}
