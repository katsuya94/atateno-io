import React from 'react';
import _ from 'lodash';

const GREETINGS = [
  'Hi, I\'m Adrien.',
  '你好。我叫Adrien。',
  'こんにちは。Adrienと申します。',
];

const SNIPPETS = [
  {
    text:
    '#lang racket\n' +
    '(display "<%= greetingText %>")',
    color:
    'wwwww cccccc\n' +
    'rccccccc g<%= greetingColor("g") %>gr',
  },
  {
    text:
    'ReactDOM.render(\n' +
    '\u00A0\u00A0<p><%= greetingText %></p>,\n' +
    '\u00A0\u00A0document.getElementById(\'root\'),\n' +
    ');',
    color:
    'ccccccccwccccccw\n' +
    '  ccc<%= greetingColor("w") %>ccccw\n' +
    '  rrrrrrrrwccccccccccccccwggggggww\n' +
    'ww',
  },
];

const COLOR_CLASSES = {
  w: 'has-text-white',
  b: 'has-text-info',
  r: 'has-text-danger',
  g: 'has-text-success',
  c: 'has-text-primary',
};

export default class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.frame = 0;

    this.greetingIndex = 0;
    this.snippetIndex = 0;

    this.computeTarget();

    this.state = {
      chars: [],
      colors: [],
      ids: [],
      cursorBlink: true,
      cursorShouldBlink: false,
    };
  }

  componentDidMount() {
    this.animationTimerId = window.setInterval(
      () => this.tick(),
      30,
    );

    this.blinkTimerId = window.setInterval(
      () => this.toggleCursor(),
      1000,
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.animationTimerId);
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
  }

  tick() {
    const targetLength = this.target.chars.length;

    const typeUntil = targetLength * 2;
    const showUntil = typeUntil + 50;
    const bkspUntil = showUntil + targetLength;
    const waitUntil = bkspUntil + 50;

    let typedLength;
    let cursorShouldBlink;

    if (this.frame < typeUntil) {
      typedLength = _.floor(this.frame / 2);
      cursorShouldBlink = false;
    } else if (this.frame < showUntil) {
      typedLength = targetLength;
      cursorShouldBlink = true;
    } else if (this.frame < bkspUntil) {
      typedLength = bkspUntil - this.frame;
      cursorShouldBlink = false;
    } else if (this.frame < waitUntil) {
      typedLength = 0;
      cursorShouldBlink = true;
    } else {
      this.frame = 0;
      this.greetingIndex = (this.greetingIndex + 1) % GREETINGS.length;
      this.snippetIndex = (this.snippetIndex + 1) % SNIPPETS.length;
      this.computeTarget();
    }

    const greetingState = _.mapValues(
      this.target,
      array => _.take(array, typedLength),
    );

    this.setState(_.assign(greetingState, { cursorShouldBlink }));
    this.frame += 1;
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

  toggleCursor() {
    this.setState(prevState => ({ cursorVisible: !prevState.cursorVisible }));
  }

  render() {
    return (
      <p className="greeting-text is-size-3">
        {this.coloredText()}
        {
          (!this.state.cursorShouldBlink || this.state.cursorVisible) ? (
            <span key="cursor" className="has-text-white">&#x2588;</span>
          ) : null
        }
      </p>
    );
  }
}
