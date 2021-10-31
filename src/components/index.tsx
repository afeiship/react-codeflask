import noop from '@jswork/noop';
import classNames from 'classnames';
import React, { Component } from 'react';
import CodeFlask from 'codeflask';
import Prism from 'prismjs';

const CLASS_NAME = 'react-codeflask';
const SUPPORT_LANGUAGES = ['ruby', 'html', 'css', 'javascript', 'java', 'php', 'shell', 'kotlin'];

interface EventTarget {
  target: {
    value: string;
  };
}

type BaseProps = Omit<React.AllHTMLAttributes<HTMLInputElement>, 'onChange'>;

export type ReactCodeflaskProps = BaseProps & {
  /**
   * Default code value.
   */
  value?: string;
  /**
   * The default highlight lanugage.
   */
  language?: string;
  /**
   * Max height when show scroll.
   */
  height?: number | string;
  /**
   * The change handler.
   */
  onChange?: (event: EventTarget) => void;
  /**
   * Adapter options
   */
  options?: any;
};

export default class ReactCodeflask extends Component<ReactCodeflaskProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    height: 0,
    onChange: noop,
    value: '',
    language: 'javascript',
    options: {
      lineNumbers: true
    }
  };

  private root: HTMLDivElement | null = null;
  private jar: CodeFlask = null;

  state = { minHeight: 40 };

  get compoutedMinHeight() {
    const preHeight = this.root?.querySelector('.codeflask__pre');
    const minHeight = preHeight?.getBoundingClientRect().height!;
    const lines = this.root?.querySelectorAll('.codeflask__lines .codeflask__lines__line');
    const targetHeight = lines?.length == 1 ? minHeight : minHeight + 20;
    return Math.max(targetHeight, 40) || 0;
  }

  get computedStyle() {
    const { style, height } = this.props;
    return height
      ? { ...style, height: height, minHeight: 40 }
      : { ...style, minHeight: this.compoutedMinHeight };
  }

  private addLangs = () => {
    SUPPORT_LANGUAGES.forEach((item) => {
      this.jar.addLanguage(item, Prism.languages[item]);
    });
  };

  private autoUpdate = () => {
    const { onChange } = this.props;
    onChange!({ target: { value: this.jar.code } });
    this.setState({ minHeight: this.compoutedMinHeight });
  };

  shouldComponentUpdate(inProps) {
    const { value } = inProps;
    if (value !== this.jar.code) {
      this.jar.updateCode(value);
    }
    return true;
  }

  componentDidMount() {
    const { value, language, options } = this.props;
    // todo: other language  not work.
    const opts = { language: 'js', ...options };
    const editorElem = this.root;
    this.jar = new CodeFlask(editorElem, opts);
    this.addLangs();
    this.jar.updateCode(value);
    this.jar.onUpdate(this.autoUpdate);
  }

  render() {
    const { className, value, onChange, height, language, options, ...props } = this.props;

    return (
      <div
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        style={this.computedStyle}
        {...props}>
        <span ref={(root) => (this.root = root)}></span>
        <span className="language-name">{language}</span>
      </div>
    );
  }
}
