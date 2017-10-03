import React from 'react';
import { Link } from 'react-router-dom';
import kubernetes from '../assets/kubernetes.svg';
import kafka from '../assets/kafka.svg';
import react from '../assets/react.svg';
import rails from '../assets/rails.svg';
import racket from '../assets/racket.svg';

function Title() {
  return (
    <div className="app-title">
      <h1 className="title is-size-1">
        Adrien Tateno
      </h1>
      <h2 className="subtitle is-size-3">
        Create <b className="has-text-primary">systems</b>, not goals.
      </h2>
    </div>
  );
}

function Technologies() {
  return (
    <div className="app-technologies">
      <img src={kubernetes} alt="Kubernetes" />
      <img src={kafka} alt="Kafka" />
      <img src={react} alt="React" />
      <img src={rails} alt="Ruby on Rails" />
      <img src={racket} alt="Racket" />
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
          <li>Broken Dev Environments</li>
          <li>Bad Domain-Specific Languages</li>
          <li>Forks (like, the silverware)</li>
        </ul>
      </div>
    </div>
  );
}

function Social() {
  return (
    <div className="app-links">
      <a href="//github.com/katsuya94" className="button is-large">
        <span className="icon">
          <i className="fa fa-github" />
        </span>
        <span>GitHub</span>
      </a>
      <a href="//www.linkedin.com/in/atateno" className="button is-large">
        <span className="icon">
          <i className="fa fa-linkedin" />
        </span>
        <span>LinkedIn</span>
      </a>
      <Link to="/blog" className="button is-large">
        <span className="icon">
          <i className="fa fa-book" />
        </span>
        <span>Blog</span>
      </Link>
    </div>
  );
}

export default function Experience() {
  return (
    <div className="app-experience container">
      <Title />
      <Technologies />
      <Preferences />
      <Social />
    </div>
  );
}
