/* global TrelloPowerUp */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  background: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Content = styled.div`
  background: white;
  padding: 24px;
  width: 80%;
  max-width: 600px;
  max-height: 90%;
`;

const t = TrelloPowerUp.iframe();

class Overlay extends Component {
  componentDidMount() {
    // close overlay if user presses escape key
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        t.closeOverlay().done();
      }
    });

  }
  
  closeOverlay(e) {
    if (e.target.classList.contains('overlay')) {
      t.closeOverlay().done();
    }
  }

  render() {
    return (
      <OverlayContainer className="overlay" onClick={(e) => this.closeOverlay(e)}>
        <Content>
          <h2>Tips for using t.overlay()</h2>
          <hr />
          <ol>
            <li>You should only call t.overlay() as a response to a user action, such as clicking a button.</li>
            <li>Try to use t.popup() when possible instead of t.overlay()as it helps to better maintain context.</li>
            <li>When using an overlay, be sure to keep the user aware they haven't left their Trello board, and make it easy and intuitive to close.</li>
            <li>Try to get your overlay to load and render as quickly as possible.</li>
          </ol>
        </Content>
      </OverlayContainer>
    );
  }
}

ReactDOM.render(<Overlay />, document.getElementById('root'));