import noop from '@jswork/noop';
import classNames from 'classnames';
import React, { Component } from 'react';
import CodeFlask from 'codeflask';

const CLASS_NAME = 'react-codeflask';

interface EventTarget {
  target: {
    value: string;
  };
}

export type ReactCodeflaskProps = typeof HTMLElement & {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * The extended style.
   */
  style?: any;
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
  maxHeight?: number;
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
    maxHeight: 0,
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
    return Math.max(targetHeight, 40);
  }

  get computedStyle() {
    const { style, maxHeight } = this.props;
    return maxHeight
      ? { ...style, height: maxHeight, minHeight: 40 }
      : { ...style, minHeight: this.compoutedMinHeight };
  }

  shouldComponentUpdate(inProps) {
    const { value } = inProps;
    if (value !== this.jar.code) {
      this.jar.updateCode(value);
    }
    return true;
  }

  componentDidMount() {
    const { value, language, options } = this.props;
    const opts = { language, ...options };
    const editorElem = this.root;
    this.jar = new CodeFlask(editorElem, opts);
    this.jar.updateCode(value);
    this.jar.onUpdate(this.autoUpdate);
  }

  autoUpdate = () => {
    const { onChange } = this.props;
    onChange!({ target: { value: this.jar.code } });
    this.setState({ minHeight: this.compoutedMinHeight });
  };

  render() {
    const { className, value, onChange, maxHeight, options, ...props } = this.props;

    return (
      <div
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        ref={(root) => (this.root = root)}
        style={this.computedStyle}
        {...props}
      />
    );
  }
}
