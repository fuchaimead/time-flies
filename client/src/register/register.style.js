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
    width: 550px !important;
    background-color: rgba(256, 256, 256, 0.5);
    margin-top: 150px;

    i {
      margin-top: 14px;
    }
  }

  .ui.grid {
    padding: 30px;
  }
`

export default Style;