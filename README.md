# react-codejar
> Code live editor for react based on codejar.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```shell
npm install -S @jswork/react-codejar
```

## usage
1. import css
  ```scss
  @import "~@jswork/boilerplate-react-component/dist/style.css";

  // or use sass
  @import "~@jswork/boilerplate-react-component/dist/style.scss";

  // customize your styles:
  $boilerplate-react-component-options: ()
  ```
2. import js
  ```js
  import React from 'react';
  import ReactCodejar from '@jswork/boilerplate-react-component';
  import styled from 'styled-components';

  const Container = styled.div`
    width: 80%;
    margin: 30px auto 0;
  `;

  export default (props: any) => {
    return (
      <Container>
        <ReactCodejar />
      </Container>
    );
  };

  ```

## preview
- https://afeiship.github.io/react-codejar/

## license
Code released under [the MIT license](https://github.com/afeiship/react-codejar/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/react-codejar
[version-url]: https://npmjs.org/package/@jswork/react-codejar

[license-image]: https://img.shields.io/npm/l/@jswork/react-codejar
[license-url]: https://github.com/afeiship/react-codejar/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/react-codejar
[size-url]: https://github.com/afeiship/react-codejar/blob/master/dist/react-codejar.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/react-codejar
[download-url]: https://www.npmjs.com/package/@jswork/react-codejar
