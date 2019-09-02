import Styled from "react-emotion";
import BackgroundImage from "../assets/background.png";

const Style = Styled('div')`
  &.background-image {
    background: url(${BackgroundImage});
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .login-container {
    background-color: rgba(256, 256, 256, 0.5);
    padding: 30px;
  }

  .center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ui.center.aligned.header {
    margin: 0;
  }

  @media only screen and (min-width: 768px) {
    .login-container {
      width: 40%;
    }
  }
`

export default Style;