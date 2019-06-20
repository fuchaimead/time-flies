import FlightDetails from "./flightDetails";
import React from "react";
import { Header, Label, Segment } from "semantic-ui-react";
import { isNil } from "lodash";

class FlightTotals extends React.Component {
  state = { showDetails: false }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }

  renderDetails() {
    if(!this.state.showDetails) { return(null); }

    return(
      <FlightDetails {...this.props}/>
    );
  }

  render() {
    const details = this.state.showDetails ? "Hide Details" : "Show Details";
    if(this.props.flights.length < 1 || this.props.flights === undefined) { return(null); }

    let totalHours = this.props.flights.map(flight => flight.total_duration).reduce((prev, next) => prev + next);
    totalHours = isNil(totalHours) ? 0 : totalHours;
    return(
      <Segment>
        <Header as='h3' className="flight-totals">Total Duration of Flight</Header>
        <Label color='blue' size='large'>{totalHours} hours</Label>
        <h4>
          <a onClick={() => this.toggleDetails()}>
            {details}
          </a>
        </h4>
        {this.renderDetails()}
      </Segment>
    );
  }
}

export default FlightTotals