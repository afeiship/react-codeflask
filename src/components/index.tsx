import noop from '@jswork/noop';
import classNames from 'classnames';
import React, { Component } from 'react';
import CodeFlask from 'codeflask';
const CLASS_NAME = 'react-codejar';

export type ReactCodejarProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * Default value.
   */
  value?: object;
  /**
   * The change handler.
   */
  onChange?: Function;
};

export default class ReactCodejar extends Component<ReactCodejarProps> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {
    value: null,
    onChange: noop
  };

  private root: HTMLTextAreaElement | null = null;

  state = {
    minHeight: 200
  };

  componentDidMount() {
    const editorElem = this.root;
    const flask = new CodeFlask(editorElem, { language: 'js', lineNumbers: true });
    const textarea = editorElem?.querySelector('textarea');
    flask.updateCode('const my_new_code_here = "Blabla"');
    flask.onUpdate((code) => {
      console.log('code:', code);

      textarea!.value = code;
      setTimeout(() => {
        this.syncHeight();
      }, 0);

      // do something with code here.
      // this will trigger whenever the code
      // in the editor changes.
    });

    // autosize(textarea);
  }

  syncHeight() {
    const preHeight = this.root?.querySelector('.codeflask__pre');
    const minHeight = preHeight?.getBoundingClientRect().height!;
    const lines = this.root?.querySelectorAll('.codeflask__lines .codeflask__lines__line');
    const targetHeight = lines?.length == 1 ? minHeight : minHeight + 20;
    this.setState({ minHeight: Math.max(targetHeight, 40) });
  }

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
