import Styled from "react-emotion";

const Style = Styled('div')`
  .section {
    padding: 10px;
    width: 250px;
  }

  .flight-details {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 3px;
  }
  .total {
    font-weight: 700;
  }

  .label {
    font-weight: 700;
    padding-right: 10px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 3px;
  }
`

export default Style;