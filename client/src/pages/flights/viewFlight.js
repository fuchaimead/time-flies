import Axios from "axios";
import FlightDetails from "./flightDetails";
import React from "react";
import Moment from "moment";
import Style from "./viewFlight.style";
import { Button, Grid, Header, Modal } from "semantic-ui-react";

class ViewFlight extends React.Component {
  state = { modalOpen: false }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleDelete(id) {
    if(window.confirm("Are you sure you want to delete this flight?")) {
      Axios.delete(`/api/flights/${id}`) 
      .then(res => {
        this.props.deleteFlight(id);
        // flash message
        const {headers} = res;
        this.props.dispatch({ type: 'SET_HEADERS', headers });
      })
      .catch( err => {
        console.log(err);
      });
    }
  }

  handleEdit(id) {
    this.props.history.push(`/${id}/edit`)
  }

  toggleVisible () {
    this.setState({ isVisible: !this.state.isVisible });
  }
  
  viewFlight() {
    return(
      <FlightDetails {...this.props}/>
    );
  }

  render () {
    const { comments, date, id, identification, model, total_duration } = this.props.flight;
    const formattedDate = Moment(date).format("MM/DD/YYYY");
    if(this.props.flight === undefined) { return (null); }

    return(
      <Modal closeIcon trigger={<h4><a>{formattedDate}</a></h4>}>
          <Modal.Content>
            <Style>
              <Header as="h3">Date: {formattedDate}</Header>
              <p><strong>Description</strong> {comments}</p>
              <p><strong>Aircraft Make & Model</strong> {model}</p>
              <p><strong>Aircraft Identification</strong> {identification}</p>
              <p><strong>Total Hours</strong> {total_duration}</p>
              {this.viewFlight()}
              <Grid columns={2}>
                <Grid.Column></Grid.Column>
                <Grid.Column className="align-left">
                  <Button onClick={() => this.handleEdit(id)}>Edit</Button>
                  <Button onClick={() => this.handleDelete(id)}>Delete</Button>
                </Grid.Column>
              </Grid>
            </Style>
          </Modal.Content>
        </Modal>
    );
  }
}

export default ViewFlight;