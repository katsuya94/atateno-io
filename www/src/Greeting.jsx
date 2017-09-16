import React from 'react';
import _ from 'lodash';

const GREETINGS = [
  'Hi, I\'m Adrien.',
  '你好。我叫Adrien。',
  'こんにちは。Adrienと申します。',
];

const SNIPPETS = [
  {
    text: '#lang racket\n(display "<%= greetingText %>")',
    color: 'wwwww bbbbbb\nrbbbbbbb g<%= greetingColor("g") %>gr',
  },
];

const COLOR_CLASSES = {
  w: 'has-text-white',
  b: 'has-text-info',
  r: 'has-text-danger',
  g: 'has-text-success',
};

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.typedLength = 0;

    this.greetingIndex = 0;
    this.snippetIndex = 0;

    this.computeTarget();

    this.state = {
      chars: [],
      colors: [],
      ids: [],
    };
  }

  componentDidMount() {
    this.timerId = window.setInterval(
      () => this.tick(),
      120,
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.timerId);
  }

  computeTarget() {
    const greetingText = GREETINGS[this.greetingIndex];
    const greetingColor = color => _.repeat(color, greetingText.length);

    const snippet = SNIPPETS[this.snippetIndex];
    const snippetText = _.template(snippet.text);
    const snippetColor = _.template(snippet.color);

    this.target = {
      chars: [...snippetText({ greetingText })],
      colors: [...snippetColor({ greetingColor })],
    };

    this.target.ids = _.range(this.target.chars.length);

    console.log(this.target);
  }

  tick() {
    this.typedLength += 1;

    this.setState(
      _.mapValues(this.target, array => _.take(array, this.typedLength)),
    );
  }

  coloredText() {
    const coloredChars = _.zip(
      this.state.chars,
      this.state.colors,
      this.state.ids,
    );

    return _.map(coloredChars, ([char, color, id]) => (
      char === '\n' ? (
        <br key={id} />
      ) : (
        <span key={id} className={COLOR_CLASSES[color]}>{char}</span>
      )
    ));
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-2 is-hidden-touch" />
        <div className="column">
          <p className="is-code is-size-2">
            {this.coloredText()}
            <span key="cursor" className="has-text-white">&#x2588;</span>
          </p>
        </div>
        <div className="column is-2 is-hidden-touch" />
      </div>
    );
  }
}
