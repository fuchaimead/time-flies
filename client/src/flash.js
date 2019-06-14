import React from 'react';
import Style from './flash.style';
import { connect } from 'react-redux';
import { clearFlash } from './actions/flash';
import { Message, Container, Header } from 'semantic-ui-react';

const fadeFlash = (dispatch, duration)=> {
  if(duration === null) {
    duration = 3000;
  }
  setTimeout(() => {
    dispatch(clearFlash());
  }, duration);
};

const Flash = ({ flash, dispatch }) => {
  if (flash.message) {
    return (
      <Style>
        <Container>
          <Message
            onDismiss={() => dispatch(clearFlash())}
            color={flash.color}
          >
            <Header as='h5' textAlign='center'>{flash.message}</Header>
            {fadeFlash(dispatch, flash.duration)}
          </Message>
        </Container>
      </Style>
    );
  }
  return null;
};

const mapStateToProps = state => {
  const { flash } = state;
  return { flash };
};

export default connect(mapStateToProps)(Flash);