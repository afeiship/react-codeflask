import noop from '@jswork/noop';
import classNames from 'classnames';
import React, { Component } from 'react';
import { CodeJar } from 'codejar';
import Prism from 'prismjs';
import hljs from 'highlight.js';
import { withLineNumbers } from 'codejar/linenumbers';

const CLASS_NAME = 'react-codejar';
const highlight = (editor) => {
  // highlight.js does not trims old tags,
  // let's do it by this hack.
  editor.textContent = editor.textContent;
  hljs.highlightElement(editor);
};

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

  componentDidMount() {
    const jar = CodeJar(this.root!, withLineNumbers(highlight), { tab: '\t' });
    jar.updateCode('let foo = "bar"');
    this.root!.addEventListener('input', () => {
      console.log('input ...', jar.toString());
    });
  }

  render() {
    const { className, value, onChange, ...props } = this.props;

    return (
      <textarea
        data-component={CLASS_NAME}
        className={classNames(CLASS_NAME, 'language-js', className)}
        ref={(root) => (this.root = root)}
        {...props}
      />
    );
  }
}
