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

export type ReactCodeflaskProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * Default value.
   */
  value?: any;
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
    const { className, value, onChange, ...props } = this.props;

    return (
      <div
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, className)}
        ref={(root) => (this.root = root)}
        style={{ minHeight: this.state.minHeight }}
        {...props}
      />
    );
  }
}
