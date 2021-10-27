import React from 'react';
import ReactCodeflask from '../../src/main';
import '../../src/components/style.scss';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 30px auto 0;
`;

export default (props: any) => {
  return (
    <Container>
      <ReactCodeflask maxHeight={200} />
    </Container>
  );
};
