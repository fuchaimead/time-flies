import { Button, Header, Grid, Form, Segment } from 'semantic-ui-react';
import React from "react";
import Style from "./account.style";
import { css } from "emotion";

class Field extends React.Component {
  state = {     
    first_name: this.props.user.first_name
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  render() {
    return(
      <Style>
        <Segment basic>
          <Grid container>
            <Grid.Row>
              <Header as='h3' textAlign='center'>Update your account info</Header>
            </Grid.Row>
            <Grid.Row>
              <Segment className={css`display: flex; width: 100%; justify-content: space-between;`}>
                <Form>
                  <Form.Field>
                    <label>First Name</label>
                    <input
                      required
                      autoFocus
                      name='first_name'
                      value={this.state.first_name}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form>
                <Button className={css`height: 38px; margin-top: 19px;`} onClick={() => this.toggleField("first_name")}>Save</Button>
              </Segment>
            </Grid.Row>
          <Button onClick={() => this.props.showAccount()}>Back</Button>
          </Grid>
        </Segment>
      </Style>
    );
  }
}

export default Field;