import React, { Component } from 'react';
import Style from './register.style';
import { Button, Form, Icon, Segment, Header } from 'semantic-ui-react';
import { handleLogin } from '../actions/auth';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { css } from 'emotion';

class Login extends Component {
  state = { email: '', password: '' }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    this.props.dispatch(handleLogin(email, password, this.props.history))
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;

    return(
      <Style className="background-image">
        <div className="center">
          <div className="login-container">
            <Form onSubmit={this.handleSubmit}>
            <div className="row">
                <Icon name='paper plane' size='big' />
                <Header as='h1' textAlign='center'>Login to TimeFlies</Header>
              </div>
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
                <Segment textAlign='center' basic>
                  <Button primary type='submit'>Sign In</Button>
                </Segment>
              <div className={css`text-align: center; background: white;`}>
                <strong>Don't have an account? <Link to="/register">Register Here</Link></strong>
              </div>
            </Form>
          </div>
        </div>
    </Style>
    );
  }
}

export default connect()(Login);