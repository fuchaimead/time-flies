import Axios from "axios";
import React from "react";
import Style from "./form.style";
import { connect } from "react-redux";
import { Button, Container, Divider, Grid, Header, Form } from "semantic-ui-react";

class FlightForm extends React.Component {
  state = { flight: 
            { actual_instrument: "", 
              airplane_mel: "", 
              airplane_sel: "", 
              arrival: "", 
              comments: "", 
              cross_country_hours: "", 
              date: "", 
              day_hours: "", 
              departure: "",
              dual_received: "", 
              ground_trainer: "", 
              identification: "", 
              maneuvers: "",
              model: "", 
              night_hours: "", 
              num_instrument_approaches: "", 
              num_landings_day: "", 
              num_landings_night: "", 
              pic_hours: "", 
              simulated_instrument: "",
              solo_hours: "",
              total_duration: "",
            },
            editing: false,
            value: "Airplane SEL",
          }

  componentDidMount() {
    if(this.props.match.params.id !== undefined) {
      Axios.get(`/api/flights/${this.props.match.params.id}`) 
        .then(res => {
          const {headers} = res;
          this.props.dispatch({ type: 'SET_HEADERS', headers })
          this.setState({ flight: res.data, editing: true });
        })
        .catch( err => {
          const {headers} = err;
          this.props.dispatch({ type: 'SET_HEADERS', headers })
          console.log(err);
      })
    }
  }

  handleCancel() {
    this.props.history.push("/");
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ flight: {...this.state.flight, [id]: value } });
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const data = {...this.state.flight, user_id: this.props.user.id}
    if(data.id) {
      Axios.put(`/api/flights/${data.id}`, data)
      .then(res => {
        const {headers} = res;
        this.props.dispatch({ type: 'SET_HEADERS', headers })
        this.props.history.push("/")
      })
      .catch( err => {
        console.log(err);
    });
    } else {
      Axios.post("/api/flights", data)
        .then(res => {
          const {headers} = res;
          this.props.dispatch({ type: 'SET_HEADERS', headers })
          this.props.history.push("/")
        })
        .catch( err => {
          const {headers} = err;
          this.props.dispatch({ type: 'SET_HEADERS', headers })
          console.log(err);
      });
    }
  }

  setValue(value) {
    this.setState({value: value});
  }

  renderContent() {
    const { actual_instrument, airplane_mel, airplane_sel, arrival, cross_country_hours, day_hours, departure, dual_received, identification, 
      maneuvers, model, night_hours, num_instrument_approaches, num_landings_day, num_landings_night, pic_hours, simulated_instrument, solo_hours } = this.state.flight;

    let total_duration = airplane_mel || airplane_sel;
    
    if(this.state.value === "AATD") { return(null); }
    
    return(
      <div>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h4" className="sub-header">Aircraft</Header>
            <Divider />
            <Form.Group widths="equal">
              <Form.Input label="Make & Model" id="model" value={model} onChange={this.handleChange} required/>
              <Form.Input label="Identification" id="identification" value={identification} onChange={this.handleChange} required/>
            </Form.Group>
          </Grid.Column>
          <Grid.Column> 
            <Header as="h4" className="sub-header">Points of Departure & Arrival</Header>
            <Divider />
            <Form.Group widths="equal">
              <Form.Input fluid label="From" id="departure" value={departure} onChange={this.handleChange}/>
              <Form.Input fluid label="To" id="arrival" value={arrival} onChange={this.handleChange}/>
            </Form.Group>
          </Grid.Column>
        </Grid>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h4" className="sub-header">Type of Piloting Time</Header>
            <Divider />
            <Form.Group widths="equal">
              <Form.Input fluid label="Dual Received" placeholder="hours" id="dual_received" value={dual_received} onChange={this.handleChange} type="number" min="0" step="0.1"/>
              <Form.Input fluid label="Pilot-in-Command" placeholder="hours" id="pic_hours" value={pic_hours} onChange={this.handleChange} type="number" min="0" step="0.1"/>
            </Form.Group>
          </Grid.Column>
          <Grid.Column></Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column>
          <Header as="h4" className="sub-header">Conditions of Flight</Header>
          <Divider />
          <Form.Group>
            <Form.Input label="Day" placeholder="hours" width={4} id="day_hours" value={day_hours} onChange={this.handleChange} type="number" min="0" step="0.1"/>
            <Form.Input label="Night" placeholder="hours" width={4} id="night_hours" value={night_hours} onChange={this.handleChange} type="number" min="0" step="0.1"/>
            <Form.Input label="Cross Country" placeholder="hours" width={4} id="cross_country_hours" value={cross_country_hours} onChange={this.handleChange} type="number" min="0" step="0.1"/>
          </Form.Group>
          <Form.Group>
            <Form.Input label="Actual Instrument" placeholder="hours" width={4} id="actual_instrument" value={actual_instrument} onChange={this.handleChange} type="number" min="0" step="0.1"/>
            <Form.Input label="Simulated Instrument" placeholder="hours" width={4} id="simulated_instrument" value={simulated_instrument} onChange={this.handleChange} type="number" min="0" step="0.1"/>
          </Form.Group>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column>
            <Header as="h4" className="sub-header">Flight Details</Header>
            <Divider />
            <Form.Group>
              <Form.Input label="No Instr. Approaches" placeholder="number" width={4} id="num_instrument_approaches" value={num_instrument_approaches} onChange={this.handleChange} type="number" min="0" step="1"/>
              <Form.Input label="No. Landings Day" placeholder="number" width={4} id="num_landings_day" value={num_landings_day} onChange={this.handleChange} type="number" min="0" step="1"/>
              <Form.Input label="No. Landings Night" placeholder="number" width={4} id="num_landings_night" value={num_landings_night} onChange={this.handleChange} type="number" min="0" step="1"/>
            </Form.Group>
            <Form.Group>
              { this.state.value === "Airplane SEL" && <Form.Input fluid label="Airplane SEL" placeholder="hours" id="airplane_sel" width={4} value={airplane_sel} onChange={this.handleChange} type="number" min="0" step="0.1"/>}
              { this.state.value === "Airplane MEL" && <Form.Input fluid label="Airplane MEL" placeholder="hours" id="airplane_mel" width={4} value={airplane_mel} onChange={this.handleChange} type="number" min="0" step="0.1"/>}
              <Form.Input label="Solo Flight" placeholder="hours" width={4} id="solo_hours" value={solo_hours} onChange={this.handleChange} type="number" min="0" step="0.1"/>
              <Form.Input label="Total Duration" placeholder="hours" width={4} id="total_duration" value={total_duration} onChange={this.handleChange} type="number" min="0" step="0.1"/>
            </Form.Group>
          </Grid.Column>
        </Grid>
        <Form.TextArea label="Procedures and maneuvers" width={8} id="maneuvers" value={maneuvers} onChange={this.handleChange}/>
        <Grid columns={2}>
          <Grid.Column></Grid.Column>
          <Grid.Column className="align-left">
            <Button color="yellow" onClick={() => this.handleCancel()}>Cancel</Button>
            <Button color="green" type="submit">Save</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  renderTrainerContent() {
    const { dual_received, ground_trainer, maneuvers, model, num_instrument_approaches, simulated_instrument } = this.state.flight; 

    if(this.state.value !== "AATD") {return(null); }

    return(
      <div>
        <Grid>
          <Grid.Column>
            <Header as="h4" className="sub-header">Ground Trainer</Header>
            <Divider />
            <Form.Group>
                <Form.Input label="Make & Model" placeholder="Make & Model" width={4} id="model" value={model} onChange={this.handleChange} required/>
                <Form.Input fluid label="Dual Received" placeholder="Dual Received" width={4} id="dual_received" value={dual_received} onChange={this.handleChange} type="number" min="0" step="0.1"/>
                <Form.Input label="No Instr. Approaches" placeholder="No Instr. Approaches" width={4} id="num_instrument_approaches" value={num_instrument_approaches} onChange={this.handleChange} type="number" min="0" step="1"/>
                <Form.Input label="Simulated Instrument" placeholder="Simulated Instrument" width={4} id="simulated_instrument" value={simulated_instrument} onChange={this.handleChange} type="number" min="0" step="0.1"/>
            </Form.Group>
            <Form.Group>
                <Form.Input label="Ground Hours" placeholder="Ground Hours" width={4} id="ground_trainer" value={ground_trainer} onChange={this.handleChange} type="number" min="0" step="0.1"/>
            </Form.Group>
          <Form.TextArea label="Procedures and maneuvers" width={8} id="maneuvers" value={maneuvers} onChange={this.handleChange}/>
          </Grid.Column>
        </Grid>
        <Grid columns={2}>
          <Grid.Column></Grid.Column>
          <Grid.Column className="align-left">
            <Button color="yellow" onClick={() => this.handleCancel()}>Cancel</Button>
            <Button color="green" type="submit">Save</Button>
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  renderHeader() {
    return(
      this.state.editing ? "Updating Flight" : "New Flight"
    );
  }

  render() {
    const flightOptions = [
      { 
        text: "Airplane SEL",
        value: "Airplane SEL"
      },
      { 
        text: "Airplane MEL",
        value: "Airplane MEL"
      },
      {
        text: "AATD",
        value: "AATD"
      },
    ]

    const { comments, date } = this.state.flight; 

    return(
      <Style>
        <Container className="flight-form">
          <Header as="h1" textAlign="center" className="main-header">{this.renderHeader()}</Header>
          <Divider />
          <br />
          <Form onSubmit={this.handleSubmit}>
          <Grid>
            <Grid.Column>
              <Form.Group>
                <Form.Input label="Date" placeholder="Date" width={4} id="date" value={date} onChange={this.handleChange} required type="date"/>
                <Form.Input label="Description" placeholder="Description" width={4} id="comments" value={comments} onChange={this.handleChange}/>
                <Form.Dropdown onChange={(e, { value }) => this.setValue(value)} defaultValue={flightOptions[0].value} label="Piloting Time" id="pilotingTime" fluid selection options={flightOptions}/>
              </Form.Group>
            </Grid.Column>
          </Grid>
          {this.renderTrainerContent()}
          {this.renderContent()}
        </Form>
        </Container>
      </Style>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(FlightForm);