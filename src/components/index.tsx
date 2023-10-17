import noop from '@jswork/noop';
import classNames from 'classnames';
import React, { Component } from 'react';
import CodeFlask from 'codeflask';
import Prism from 'prismjs';
import jsBeautify from 'js-beautify';

const CLASS_NAME = 'react-codeflask';
const IMG_LOADING = 'https://assets-cdn.shimo.im/assets/images/loading-b67e5a67dc.gif';
const SUPPORT_LANGUAGES = [
  'plaintext',
  'shell',
  'html',
  'javascript',
  'json',
  'typescript',
  'css',
  'dart',
  'java',
  'go',
  'python',
  'ruby',
  'lua',
  'rust',
  'kotlin',
  'php',
  'xml',
  'apache',
  'ini',
  'yml',
  'sql',
  'c'
];

const beautifyOptions = {
  html: {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: 1,
    preserve_newlines: true,
    indent_handlebars: false,
    extra_liners: [],
    end_with_newline: false
  },
  js: {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: 1,
    preserve_newlines: true,
    indent_handlebars: false,
    extra_liners: [],
    end_with_newline: false
  },
  css: {
    indent_size: 2,
    indent_char: ' ',
    max_preserve_newlines: 1,
    preserve_newlines: true,
    indent_handlebars: false,
    extra_liners: [],
    end_with_newline: false
  }
};

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
   * If readonly.
   */
  readOnly?: boolean;
  /**
   * If disalbed.
   */
  disabeld?: boolean;
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
    readOnly: false,
    options: {
      lineNumbers: true
    }
  };

  private root: HTMLSpanElement | null = null;
  private jar: CodeFlask = null;

  state = { minHeight: 40, loading: false };

  get computedMinHeight() {
    const preHeight = this.root?.querySelector('.codeflask__pre');
    const minHeight = preHeight?.getBoundingClientRect().height!;
    const lines = this.root?.querySelectorAll('.codeflask__lines .codeflask__lines-line');
    const targetHeight = lines?.length == 1 ? minHeight : minHeight + 20;
    return Math.max(targetHeight, 40) || 0;
  }

  get computedStyle(): any {
    const { style, height } = this.props;
    return height
      ? { ...style, height: height, minHeight: 40 }
      : { ...style, minHeight: this.computedMinHeight };
  }

  private addLangs = () => {
    SUPPORT_LANGUAGES.forEach((item) => {
      this.jar?.addLanguage(item, Prism.languages[item]);
    });
  };

  private autoUpdate = () => {
    if (!this.jar) return;
    const { onChange } = this.props;
    onChange!({ target: { value: this.jar?.code } });
    this.setState({ minHeight: this.computedMinHeight });
  };

  shouldComponentUpdate(inProps) {
    const { value } = inProps;
    if (value !== this.props.value) this.updateJar(value);
    return true;
  }

  componentDidMount() {
    const { value, readOnly, language, options } = this.props;
    const opts = { language, readonly: readOnly, ...options };
    const editorElem = this.root;
    this.setState({ loading: true });
    this.jar = new CodeFlask(editorElem, opts);
    this.addLangs();
    this.updateJar(value);
    this.jar?.onUpdate(this.autoUpdate);
    setTimeout(() => this.jar && this.setState({ loading: false }), 500);
  }

  componentWillUnmount() {
    this.jar = null;
  }

  updateJar = (inValue) => {
    if (!this.jar) return;
    this.jar?.updateCode(inValue);
  };

  handleFormat = () => {
    const { language } = this.props;
    const opts = beautifyOptions[language!] || beautifyOptions.js;
    const fn = jsBeautify[language] || jsBeautify.js;
    const res = fn(this.jar?.code, opts);
    this?.jar?.updateCode(res);
  };

  render() {
    const { className, value, onChange, height, language, options, ...props } = this.props;
    const { loading } = this.state;

    return (
      <div
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        style={this.computedStyle}
        {...props}>
        <button onClick={this.handleFormat} className="is-formatter">
          Format
        </button>
        <div className="is-editor" ref={(root) => (this.root = root)}>
          button
        </div>
        <span className="language-name">{language}</span>
        <div hidden={!loading} className={`${CLASS_NAME}__spin`}>
          <img alt="loading image" src={IMG_LOADING} />
        </div>
      </div>
    );
  }
}
