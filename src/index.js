import React from 'react';
import ReactDOM from 'react-dom';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';
import App from './App.js';

(async () => {
  const draw = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
  const hand = await draw.json();
  const card = hand.cards[0];
  var deviceType = '';



  if ( /iPhone/.test(navigator.userAgent) ) 
  {
    deviceType = 'NewRelic';
  }
  else {
   deviceType = 'humans';
  }
  console.log('users device is:', deviceType);

  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.REACT_APP_LD_CLIENT_SIDE_ID,
    reactOptions: {
      useCamelCaseFlagKeys: false
    },
    user: {
      key: card.code,
      avatar: card.image,
      custom: {
        groups: deviceType,
        card: card.code,
        suit: card.suit,
        face: card.value,
        selection: 'DEFAULT'
      }
    },
    flags: {
      'demoTheme': 'Default',
      'demoSoundEnabled': false,
      'demoQRCode': false,
      'demoAdmin': false,
      'demoBroken': false,
      'demoServerBroken': false
    }
  });

  ReactDOM.render(
    <LDProvider>
      <App />
    </LDProvider>,
    document.getElementById('root')
  );
})();