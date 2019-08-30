import React from "react";
import Style from "./flightDetails.style";

class FlightDetails extends React.Component {
  calculateHours(key) {
    if(this.props.flights) {
      if(this.props.flights.length === 1) {
        let hours = this.props.flights[0][key];
        if(hours === null) {
          return(0);
        }
        return(hours);
      }
      let hours = this.props.flights.map(flight => flight[key]).reduce((prev, next) => prev + next);
      return(hours.toFixed(1))
    } else {
      let hours = this.props.flight[key]
      if(hours === null) {
        return(0);
      }
      return(hours);
    }
  }

  render() {
    return(
      <Style>
        <div className="flight-details">
          <div className="section">
            <div className="row">
              <div className="label">
                Aircraft Category
              </div>
              <div className="total">
                Hours
              </div>
            </div>
            <div className="row">
              <div className="label">
                Airplane SEL
              </div>
              <div>
                {this.calculateHours("airplane_sel")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                Airplane MEL
              </div>
              <div>
              {this.calculateHours("airplane_mel")}
              </div>
            </div>
          </div>
          <div className="section">
            <div className="row">
              <div className="label">
                Type of Piloting Time
              </div>
              <div className="total">
                Hours
              </div>
            </div>
            <div className="row">
              <div className="label">
                Dual Received
              </div>
              <div>
                {this.calculateHours("dual_received")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                Pilot-in-Command
              </div>
              <div>
              {this.calculateHours("pic_hours")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                Ground Trainer
              </div>
              <div>
              {this.calculateHours("ground_trainer")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                Solo Flight
              </div>
              <div>
              {this.calculateHours("solo_hours")}
              </div>
            </div>
          </div>
          <div className="section">
            <div className="row">
              <div className="label">
                Conditions of Flight
              </div>
              <div className="total">
                Hours
              </div>
            </div>
            <div className="row">
              <div className="label">
                Day
              </div>
              <div>
                {this.calculateHours("day_hours")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                Night
              </div>
              <div>
              {this.calculateHours("night_hours")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                Cross-Country
              </div>
              <div>
              {this.calculateHours("cross_country_hours")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                Actual Instrument
              </div>
              <div>
              {this.calculateHours("actual_instrument")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                Simulated Instrument
              </div>
              <div>
              {this.calculateHours("simulated_instrument")}
              </div>
            </div>
          </div>
          <div className="section">
            <div className="row">
              <div className="label">
                Extra
              </div>
              <div className="total">
                Number
              </div>
            </div>
            <div className="row">
              <div className="label">
                Instrument Approaches
              </div>
              <div>
                {this.calculateHours("num_instrument_approaches")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                Day Landings
              </div>
              <div>
              {this.calculateHours("num_landings_day")}
              </div>
            </div>
            <div className="row">
              <div className="label">
                Night Landings
              </div>
              <div>
              {this.calculateHours("num_landings_night")}
              </div>
            </div>
          </div>
        </div>
      </Style>
    );
  }
}

export default FlightDetails;