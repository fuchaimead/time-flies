
import Styled from "react-emotion";

const Style = Styled('div')`
  &.navbar {
    position: absolute;
    z-index: 10;
    width: 100%;

    i.paper.plane.big.link.icon {
      padding: 25px 50px;
    }
  
    i.times.big.link.icon, i.sidebar.big.link.icon {
      float: right;
      padding: 25px 50px 10px 0;
    }

    .nav-menu {
      float: right;
      margin-top: 20px;
      margin-right: -30px;
      background: lightblue;
      padding: 20px 15px;

      ul {
        list-style-type: none;
        padding: 0 12px;

        li {
          a {
            color: black;
          }
          font-size: 16px;
          font-weight: 400;
          padding: 10px 3px;
        }

        li:hover {
          font-weight: 600;
          cursor: pointer;
          background: rgba(256, 256, 256, 0.5);
        }
      }
    }
  }
`
export default Style;
