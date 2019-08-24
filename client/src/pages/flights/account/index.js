import Axios from "axios";
import Field from "./field";
import React, { Component } from 'react';
import { Button, Grid, Form, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { css } from 'emotion';
import Style from "./account.style";

class Account extends Component {
  state = { 
    showField: false
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleDelete() {
    if(window.confirm("Are you sure you want to delete your account? All your flight information will be deleted.")) {
      Axios.delete("/api/auth")
      .then(res => {
        // go to login page
        // show success message
      });
    }
  }

  toggleField(label, name) {
    this.setState({showField: true, name: name, label: label});
  }

  render() {
    const { email, first_name, last_name } = this.props.user;

    if(this.state.showField) { 
      return(
        <Field name={this.state.name} label={this.state.label} showAccount={() => this.setState({showField: false})} {...this.props}/>
      );
    } else {
      return(
        <Style>
          <Segment basic>
            <Form>
              <Grid container>
                <Grid.Row>
                  <Header as='h3' textAlign='center'>Update your account info</Header>
                </Grid.Row>
                <Grid.Row>
                  <Segment className={css`display: flex; width: 100%; justify-content: space-between;`}>
                      <strong>First Name: {first_name}</strong>
                    <Button onClick={() => this.toggleField("First Name", "first_name")}>Edit</Button>
                  </Segment>
                </Grid.Row>
                <Grid.Row>
                  <Segment className={css`display: flex; width: 100%; justify-content: space-between;`}>
                      <strong>Last Name: {last_name}</strong>
                    <Button onClick={() => this.toggleField("Last Name", "last_name")}>Edit</Button>
                  </Segment>
                </Grid.Row>
                <Grid.Row>
                  <Segment className={css`display: flex; width: 100%; justify-content: space-between;`}>
                      <strong>Email: {email}</strong>
                    <Button  onClick={() => this.toggleField("Email", "email")}>Edit</Button>
                  </Segment>
                </Grid.Row>
                {/* TO DO Later <Grid.Row>
                  <Segment className={css`display: flex; width: 100%; justify-content: space-between;`}>
                      <strong>Password</strong>
                    <Button onClick={() => this.toggleField("Password", "password")}>Edit</Button>
                  </Segment>
                </Grid.Row> */}
                <Button onClick={this.props.history.push("/")}>Go back</Button>
                <Button color="red" onClick={() => this.handleDelete()}>Delete Account</Button>
              </Grid>
          </Form>
        </Segment>
      </Style>
    );
    }
  }
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(Account);