import Field from "./field";
import React, { Component } from 'react';
import { Button, Grid, Form, Header, Segment } from 'semantic-ui-react';
import { handleRegister} from '../../../actions/auth';
import { connect } from 'react-redux';
import { css } from 'emotion';
import Style from "./account.style";

class Account extends Component {
  state = { 
    first_name: this.props.user.first_name,
    last_name: this.props.user.last_name,
    email: this.props.user.email, 
    password: '', 
    passwordConfirmation: '',
    showField: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password, passwordConfirmation } = this.state;

    if(password === passwordConfirmation)
      this.props.dispatch(handleRegister(first_name, last_name, email, password, passwordConfirmation, this.props.history))
    else
      alert('Passwords Do Not Match!')
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  toggleField(name) {
    this.setState({showField: true, activeField: name});
  }

  render() {
    const { email, first_name, last_name } = this.props.user;

    if(this.state.showField) { 
      return(
        <Field name={this.state.name} showAccount={() => this.setState({showField: false})} {...this.props}/>
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
                    <Button onClick={() => this.toggleField("first_name")}>Edit</Button>
                  </Segment>
                </Grid.Row>
                <Grid.Row>
                  <Segment className={css`display: flex; width: 100%; justify-content: space-between;`}>
                      <strong>Last Name: {last_name}</strong>
                    <Button onClick={() => this.toggleField("last_name")}>Edit</Button>
                  </Segment>
                </Grid.Row>
                <Grid.Row>
                  <Segment className={css`display: flex; width: 100%; justify-content: space-between;`}>
                      <strong>Email: {email}</strong>
                    <Button>Edit</Button>
                  </Segment>
                </Grid.Row>
                <Grid.Row>
                  <Segment className={css`display: flex; width: 100%; justify-content: space-between;`}>
                      <strong>Password</strong>
                    <Button>Edit</Button>
                  </Segment>
                </Grid.Row>
              </Grid>
              {/* <Grid.Row columns={2}>
                <Grid.Column>
                
                  </Grid.Column>
                <Grid.Column>
                    <Form.Field>
                      <label>Last Name</label>
                      <input
                        required
                        name='last_name'
                        value={last_name}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                    <Form.Field>
                      <label>Email</label>
                      <input
                        required
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Segment textAlign='center' basic>
                      <Button primary type='submit'>Update</Button>
                    </Segment> */}
                    {/* <hr/>
                    <Header as='h3'>Change your password</Header>
                    <Form.Field>
                      <label>Password</label>
                      <input
                        required
                        name='password'
                        value={password}
                        type='password'
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Password Confirmation</label>
                      <input
                        required
                        name='passwordConfirmation'
                        value={passwordConfirmation}
                        type='password'
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Segment textAlign='center' basic>
                      <Button primary type='submit'>Update Password</Button>
                    </Segment>
                    <div className={css`text-align: center; background: black;`}>
                </div>
                </Grid.Column>
              </Grid.Row> */}
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