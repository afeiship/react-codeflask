# react-codeflask
> A micro code-editor for awesome web pages.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-codeflask
```

## usage
1. import css
  ```scss
  @import "~@jswork/react-codeflask/dist/style.css";

  // or use sass
  @import "~@jswork/react-codeflask/dist/style.scss";

  // customize your styles:
  $react-codeflask-options: ()
  ```
2. import js
  ```js
  import React, { useState } from 'react';
  import ReactCodeflask from '@jswork/react-codeflask';
  import '../../src/components/style.scss';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;

    > .is-actions {
      margin-top: 10px;
    }
  `;

  export default (props: any) => {
    const [val, setVal] = useState('var hello = "hello world."');
    return (
      <Container>
        <ReactCodeflask
          value={val}
          height={0}
          onChange={(e) => {
            console.log('current value:', e.target.value);
            setVal(e.target.value);
          }}
        />

        <div className="is-actions">
          <button
            onClick={(e) => {
              setVal('const for="bar"; \nlet bar="bc";');
            }}>
            Set value.
          </button>
        </div>
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/react-codeflask/

## license
Code released under [the MIT license](https://github.com/afeiship/react-codeflask/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-codeflask
[version-url]: https://npmjs.org/package/@jswork/react-codeflask

[license-image]: https://img.shields.io/npm/l/@jswork/react-codeflask
[license-url]: https://github.com/afeiship/react-codeflask/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-codeflask
[size-url]: https://github.com/afeiship/react-codeflask/blob/master/dist/react-codeflask.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-codeflask
[download-url]: https://www.npmjs.com/package/@jswork/react-codeflask
