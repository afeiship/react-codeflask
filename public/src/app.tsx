import React, { useState } from 'react';
import ReactCodeflask from '../../src/main';
import '../../src/components/style.scss';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;

  > .is-actions{
    margin-top: 10px;
  }
`;

export default (props: any) => {
  const [ val, setVal ] = useState('var hello = "hello world."');
  return (
    <Container>
      <ReactCodeflask
        value={val}
        maxHeight={200}
        onChange={(e) => {
          setVal(e.target.value);
          console.log('e.target.value', e.target.value);
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
