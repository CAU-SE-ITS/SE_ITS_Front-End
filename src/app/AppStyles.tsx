import { Global, css } from "@emotion/react";

const Styles = css`
  body {
    background: var(--Shark-50, #f4f4f4);
    font-family: "Spoqa Han Sans Neo", "sans-seri";
  }
`;

const AppStyles = () => <Global styles={Styles}></Global>;

export default AppStyles;
