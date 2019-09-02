import React, { Component } from 'react';
import { Button, Form, Segment, Header, Icon } from 'semantic-ui-react';
import { handleRegister} from '../actions/auth';
import { connect } from 'react-redux';
import { css } from 'emotion';
import { Link } from 'react-router-dom';
import Style from './register.style';

class Register extends Component {
  state = { first_name: '', last_name: '', email: '', password: '', passwordConfirmation: '' }

  handleSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password, passwordConfirmation } = this.state;

    if(password === passwordConfirmation)
      this.props.dispatch(handleRegister(first_name, last_name, email, password, passwordConfirmation, this.props.history))
    else
      alert('Passwords Do Not Match!')
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, first_name, last_name, password, passwordConfirmation } = this.state;

    return(
      <Style className="background-image">
        <div className="center">
          <div className="login-container">
            <Form onSubmit={this.handleSubmit}>
              <div className="row">
                <Icon name='paper plane' size='big' />
                <Header as='h1' textAlign='center'>Sign up for TimeFlies</Header>
              </div>
                <Form.Field>
                  <label>First Name</label>
                  <input
                    required
                    autoFocus
                    name='first_name'
                    value={first_name}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    required
                    name='last_name'
                    value={last_name}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    required
                    name='email'
                    value={email}
                    onChange={this.handleChange}
                  />
                </Form.Field>
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
                  <Button primary type='submit'>Sign Up</Button>
                </Segment>
              <div className={css`text-align: center; background: white;`}>
                <strong>Already have an account? <Link to="/login">Sign In</Link></strong>
              </div>
            </Form>
          </div>
        </div>
      </Style>
    );
  }
}

export default connect()(Register);