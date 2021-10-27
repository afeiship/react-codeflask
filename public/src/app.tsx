import React from 'react';
import ReactCodejar from '../../src/main';
import 'highlight.js/styles/atom-one-dark.css';
import '../../src/components/style.scss';
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
