import axios from "axios";
import FlightDetails from "./flightDetails";
import React from "react";
import { Button, Header, Label, Form, Segment } from "semantic-ui-react";
import { isNil } from "lodash";
import { css } from "emotion";
import { connect } from "react-redux";

class FlightTotals extends React.Component {
  state = { showDetails: false, time1: null, time2: null, data: null}

  handleCalculation() {
    axios.post("/api/flights/calculate", {time1: this.state.time1, time2:this.state.time2})
    .then(res => {
      const {headers} = res;
      this.props.dispatch({ type: 'SET_HEADERS', headers });
      this.setState({ showTotal: true, data: res.data });
    })
    .catch( err => {
      console.log(err);
      const {headers} = err;
      this.props.dispatch({ type: 'SET_HEADERS', headers });
    });
  }

  setValue(id, value) {
    this.setState({[id]: value});
  }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }

  renderCalculator() {
    const fieldOptions = [
      { key: 'airplane_sel', value: 'airplane_sel', text: 'Airplane SEL' },
      { key: 'airplane_mel', value: 'airplane_mel', text: 'Airplane MEL' },
      { key: 'dual_received', value: 'dual_received', text: 'Dual Received' },
      { key: 'pic_hours', value: 'pic_hours', text: 'Pilot-in-Command' },
      { key: 'ground_trainer', value: 'ground_trainer', text: 'Ground Trainer'},
      { key: 'solo_hours', value: 'solo_hours', text: 'Solo Flight' },
      { key: 'day_hours', value: 'day_hours', text: 'Day' },
      { key: 'night_hours', value: 'night_hours', text: 'Night' },
      { key: 'cross_country_hours', value: 'cross_country_hours', text: 'Cross-Country' },
      { key: 'actual_instrument', value: 'actual_instrument', text: 'Actual Instrument' },
      { key: 'simulated_instrument', value: 'simulated_instrument', text: 'Simulated Instrument' },
    ];
  
    return(
      <div className={css`display: flex; flex-wrap: wrap; .field {margin: 5px; width: 200px;} button.ui.button {margin: 5px;}`}>
        <Form.Dropdown onChange={(e, { id, value }) => this.setValue(id, value)} placeholder="Select type of hours" id="time1" fluid selection options={fieldOptions}/>
        <Form.Dropdown onChange={(e, { id, value }) => this.setValue(id, value)} placeholder="Select type of hours" id="time2" fluid selection options={fieldOptions}/>
        <Button onClick={() => this.handleCalculation()}>Calculate</Button>
      </div>
    );
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
        <p>Pick two fields to calculate hours</p>
        {this.renderCalculator()}
        {this.state.showTotal && 
        <div>
          Combined Hours: {this.state.data}
        </div>}
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

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(FlightTotals);