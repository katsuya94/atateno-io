import React from 'react';

let linkedInWidget = null;

class LinkedIn extends React.Component {
  componentDidMount() {
    if (linkedInWidget) {
      this.linkedInContainer.appendChild(linkedInWidget);
    } else {
      const observer = new MutationObserver(() => {
        const candidates = this.linkedInContainer
          .getElementsByClassName('IN-widget');
        if (candidates.length) {
          linkedInWidget = candidates[0];
          observer.disconnect();
        }
      });
      observer.observe(this.linkedInContainer, { childList: true });
    }
  }

  render() {
    return (
      <sup ref={(e) => { this.linkedInContainer = e; }}>
        <script
          type="IN/MemberProfile"
          data-id="https://www.linkedin.com/in/adrienkatsuyatateno"
          data-format="hover"
          data-related="false"
        />
      </sup>
    );
  }
}

export default function Experience() {
  return (
    <div className="app-experience container">
      <h1 className="title is-size-1">
        Adrien Tateno
        <LinkedIn />
      </h1>
      <h2 className="subtitle is-size-3">Software Engineer</h2>
    </div>
  );
}
