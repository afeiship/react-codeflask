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
   * Default value.
   */
  value?: any;
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
    options: {
      language: 'javascript',
      lineNumbers: true
    }
  };

  private root: HTMLTextAreaElement | null = null;

  state = {
    minHeight: 40
  };

  get compoutedMinHeight() {
    const preHeight = this.root?.querySelector('.codeflask__pre');
    const minHeight = preHeight?.getBoundingClientRect().height!;
    const lines = this.root?.querySelectorAll('.codeflask__lines .codeflask__lines__line');
    const targetHeight = lines?.length == 1 ? minHeight : minHeight + 20;
    return Math.max(targetHeight, 40);
  }

  get computedStyle() {
    const { style, maxHeight } = this.props;
    if (maxHeight) {
      return { ...style, height: maxHeight, minHeight: 40 };
    }
    return { ...style, minHeight: this.compoutedMinHeight };
  }

  componentDidMount() {
    const editorElem = this.root;
    const flask = new CodeFlask(editorElem, { language: 'js', lineNumbers: true });
    const textarea = editorElem?.querySelector('textarea');
    flask.updateCode('const my_new_code_here = "Blabla"');
    flask.onUpdate((code) => {
      textarea!.value = code;
      setTimeout(() => {
        this.autoUpdate(code);
      }, 0);
    });
  }

  autoUpdate = (inValue) => {
    const { onChange } = this.props;
    this.setState({ minHeight: this.compoutedMinHeight }, () => {
      onChange!({ target: { value: inValue } });
    });
  };

  render() {
    const { className, value, onChange, options, ...props } = this.props;

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
