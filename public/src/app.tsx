import React, { useState } from 'react';
import ReactCodeflask from '../../src/main';
import '../../src/components/style.scss';
import styled from 'styled-components';
// import 'prismjs/themes/prism.css';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;

  > .is-actions {
    margin-top: 10px;
  }
`;

export default () => {
  const [val, setVal] = useState(
    `curl 'https://api.cdnjs.com/libraries/backbone.js/tutorials/this-tutorial-doesnt-exist' | json`
  );
  return (
    <Container>
      <ReactCodeflask
        value={val}
        height={0}
        language="javascript"
        // onChange={(e) => {
        //   // console.log('current value:', e.target.value);
        //   setVal(e.target.value);
        // }}
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
