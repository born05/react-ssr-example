import React from 'react';
import styled from 'styled-components';

import styling from '../constants/styling';
import Title from '../components/Title';

const Main = styled.main`
  min-height: 100vh;
  background: ${styling.bodyBg};
  color: ${styling.bodyColor};
`;

export default function NoMatch() {
  return (
    <Main>
      <Title>
        <strong>404.</strong>
        Page not found.
      </Title>
    </Main>
  );
}
