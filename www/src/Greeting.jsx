import React from 'react';

const GREETINGS = [
  "Hi, I'm Adrien.",
  "你好。我叫Adrien。",
  "こんにちは。Adrienと申します。",
]

const TEMPLATES = [
  "#lang racket\n(display 
]

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: [
        '#lang racket',
        '(display "Hi, I\'m Adrien."',
      ],
      color: [
        'wwwww bbbbbb',
        'rbbbbbbb ggggggggggggggggg',
      ],
    };
  }

  render() {
    return (
      <div className="container">
        <h1>Hello World</h1>
      </div>
    );
  }
}
