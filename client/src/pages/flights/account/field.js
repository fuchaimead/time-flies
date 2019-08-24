import Axios from "axios";
import React from "react";
import Style from "./account.style";
import { Button, Header, Grid, Form, Segment } from 'semantic-ui-react';
import { css } from "emotion";

class Field extends React.Component {
  state = {     
    [this.props.name]: this.props.user[this.props.name]
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    Axios.put("/api/auth", {[this.props.name]: this.state[this.props.name]})
      .then(res => {
        this.props.dispatch({ type: 'USER', user: res.data.data });
        this.props.showAccount();
    });
    // show success message 
    // show errors 
    // how to handle changing email and password? -- this changes the header credentials 
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
                <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>{this.props.label}</label>
                    <input
                      required
                      autoFocus
                      name={this.props.name}
                      value={this.state[this.props.name]}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                </Form>
                <Button className={css`height: 38px; margin-top: 19px;`} onClick={() => this.handleSubmit(this.props.name)} type="submit">Save</Button>
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