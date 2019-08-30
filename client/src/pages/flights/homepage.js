import axios from "axios";
import FlightTotals from "./totals";
import React from "react";
import Style from "./homepage.style";
import ViewFlight from "./viewFlight";
import { connect } from "react-redux";
import { Button, Container, Grid, Header, Pagination, Loader, Table } from "semantic-ui-react";
import { isNil, sortBy } from "lodash";

class Homepage extends React.Component {
  state = {
    column: null,
    direction: null,
    data: null, 
    viewFlight: false,
    activePage: 1,
    totalPages: 1
  }

  componentDidMount() {
    axios.post("/api/flights/page", {page: 1})
      .then(res => {
        const {headers} = res;
        this.props.dispatch({ type: 'SET_HEADERS', headers });
        console.log(res)
        this.setState({ data: res.data.data, totalPages: res.data.count/res.data.per_page });
      })
      .catch( err => {
        console.log(err);
        const {headers} = err;
        this.props.dispatch({ type: 'SET_HEADERS', headers });
    });
  }

  handlePageChange(e, activePage) {
    this.setState({activePage: activePage.activePage})
    axios.post("/api/flights/page", {page: activePage.activePage})
      .then(res => {
        const {headers} = res;
        this.props.dispatch({ type: 'SET_HEADERS', headers });
        this.setState({ data: res.data.data });
      })
      .catch( err => {
        console.log(err);
        const {headers} = err;
        this.props.dispatch({ type: 'SET_HEADERS', headers });
    });
  }

  handleDeleteFlight(id) {
    this.setState({ data: this.state.data.filter((flight) => flight.id !== id ) });
  }

  handleAddFlight() {
    this.props.history.push("/new");
  }

  handleSort(clickedColumn) {
    const { column, data, direction } = this.state;
    if(column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: sortBy(data, [clickedColumn]),
        direction: "ascending" 
      });

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
  }

  renderTableData() {
    const { column, direction } = this.state;
    if(window.screen.width < 768) {
      return(
        <Table striped sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={column === 'date' ? direction : null} onClick={() => this.handleSort('date')}>Your Flights</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.renderFlights()}
          </Table.Body>
        </Table>
      )
    } else {
      return(
        <Table striped sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={column === 'date' ? direction : null} onClick={() => this.handleSort('date')}>Date of Flight</Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'description' ? direction : null} onClick={() => this.handleSort('description')}>Description</Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'model' ? direction : null} onClick={() => this.handleSort('model')}>Aircraft Make & Model</Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'identification' ? direction : null} onClick={() => this.handleSort('identification')}>Aircraft Identification</Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'total_hours' ? direction : null} onClick={() => this.handleSort('total_hours')}>Hours</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.renderFlights()}
          </Table.Body>
        </Table>
      );
    }
  }

  renderFlights() {
    if(isNil(this.state.data)) { return(null); }

    if(window.screen.width < 768) {
      return(
        this.state.data.map(flight => {
          return(
            <Table.Row key={flight.id}>
              <Table.Cell>
                <ViewFlight flight={flight} {...this.props} deleteFlight={(id) => this.handleDeleteFlight(id)}/>
              </Table.Cell>
              <Table.Cell>
                <strong>Description:</strong> {flight.comments}
              </Table.Cell>
              <Table.Cell>
                <strong>Make & Model:</strong> {flight.model}
              </Table.Cell>
              <Table.Cell>
               <strong>Identification:</strong> {flight.identification}
              </Table.Cell>
              <Table.Cell>
               <strong>Hours:</strong>{flight.total_duration}
              </Table.Cell>
            </Table.Row>
          );
        })
      )
    } else {
      return(
        this.state.data.map(flight => {
          return(
            <Table.Row key={flight.id}>
              <Table.Cell>
                <ViewFlight flight={flight} {...this.props} deleteFlight={(id) => this.handleDeleteFlight(id)}/>
              </Table.Cell>
              <Table.Cell>
                {flight.comments}
              </Table.Cell>
              <Table.Cell>
                {flight.model}
              </Table.Cell>
              <Table.Cell>
                {flight.identification}
              </Table.Cell>
              <Table.Cell>
                {flight.total_duration}
              </Table.Cell>
            </Table.Row>
          );
        })
      )
    }
  }

  render() {
    const{first_name, last_name} = this.props.user;
    if(isNil(this.state.data)) { 
      return(
        <Loader active content="Loading your flights"/>
      ); 
    } else {
      return (
        <Style>
          <Container>
            <Header as="h1" textAlign="center">Welcome {first_name} {last_name}</Header>
            <Header as="h2" textAlign="center">Flight Log</Header>
            <FlightTotals flights={this.state.data}/>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <Button onClick={() => this.handleAddFlight()}>Add Flight</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {this.renderTableData()}
            <Grid centered>
              <Grid.Column>
                <Pagination totalPages={this.state.totalPages} activePage={this.state.activePage} onPageChange={(e, activePage) => this.handlePageChange(e, activePage)} ellipsisItem={null}/>
              </Grid.Column>
            </Grid>
          </Container>
        </Style>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Homepage);
