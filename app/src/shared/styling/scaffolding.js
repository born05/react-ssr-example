import { css } from 'styled-components';

const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  body {
    font-feature-settings: "liga", "kern";
    margin: 0;
  }

  img {
    display: block;
    width: 100%;
  }
`;

export default styles;
