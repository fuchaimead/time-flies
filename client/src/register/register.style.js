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

  .ui.container.grid {
    background-color: rgba(256, 256, 256, 0.5);
    margin-top: 150px;

    i {
      margin-top: 14px;
    }
  }

  .ui.grid {
    padding: 30px;
  }

  .ui.basic.segment {
    display: flex;
    justify-content: center;
  }

  @media only screen and (min-width: 768px) {
    .ui.form {
      width: 70%;
    }
  }

  @media only screen and (min-width: 1024px) {
    .ui.form {
      width: 50s%;
    }
  }
`

export default Style;