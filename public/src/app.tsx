import React, { useState } from 'react';
import ReactCodeflask from '../../src/main';
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
