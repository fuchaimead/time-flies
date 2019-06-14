import React from "react";
import { Grid, Header, Table } from "semantic-ui-react";

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
      <Grid columns={4}>
        <Grid.Column>
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Aircraft Category</Table.HeaderCell>
                <Table.HeaderCell>Hours</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Airplane SEL
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("airplane_sel")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Airplane MEL
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("airplane_mel")}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Type of Piloting Time</Table.HeaderCell>
                <Table.HeaderCell>Hours</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Dual Received
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("dual_received")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Pilot-in-Command
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("pic_hours")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Ground Trainer
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("ground_trainer")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Solo Flight
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("solo_hours")}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Conditions of Flight</Table.HeaderCell>
                <Table.HeaderCell>Hours</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Day
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("day_hours")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Night
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("night_hours")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Cross-Country
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("cross_country_hours")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Actual Instrument
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("actual_instrument")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Simulated Instrument
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("simulated_instrument")}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
        <Grid.Column>
          <Table basic='very' celled collapsing>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Extra</Table.HeaderCell>
                <Table.HeaderCell>Number</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Instrument Approaches
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("num_instrument_approaches")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Day Landings
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("num_landings_day")}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Header as='h5'>
                    <Header.Content>
                      Night Landings
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{this.calculateHours("num_landings_night")}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  }
}

export default FlightDetails;