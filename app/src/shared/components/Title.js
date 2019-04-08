import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styling from '../constants/styling';

const StyledTitle = styled.h1`
  color: ${styling.bodyColor};
`;

export default class Title extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: '',
  };

  render() {
    const { text } = this.props;

    return (
      <StyledTitle>
        {text}
      </StyledTitle>
    );
  }
}
