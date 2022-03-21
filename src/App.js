import React, { useEffect, useRef, createContext, useState } from 'react';
import { ChakraProvider, Flex, extendTheme } from '@chakra-ui/react';
import { useFlags, useLDClient } from 'launchdarkly-react-client-sdk';
import Navigation from './components/Navigation.js';
import Hero from './components/Hero.js';
import './App.css';

export const DemoContext = createContext();

function App() {
  const { demoTheme, demoSoundEnabled, demoQRCode, demoQRCodeWebPage, demoBroken, demoServerBroken, demoAdmin } = useFlags();
  const [context, setContext] = useState({});
  const ldClient = useLDClient();
  const theme = useRef();
  const themeCache = useRef([]);
  const DEFAULT = 'DEFAULT';

  async function updateThemeInfo(demoTheme) {
    let ctx = themeCache.current[demoTheme];
    if (!ctx) {
      const resp = await fetch(`themes/${demoTheme}/theme.json`);
      ctx = await resp.json();
      themeCache.current[demoTheme] = ctx;
    }

    ctx = {
      ...ctx,
      avatar: ldClient.getUser().avatar,
      soundEnabled: demoSoundEnabled,
      showQRCode: demoQRCode,
      qrCodeForWebPage: demoQRCodeWebPage,
      demoAdmin: demoAdmin,
      selectedItem: DEFAULT,
      NOP: DEFAULT
    };

    theme.current = extendTheme(ctx.themeStyle);
    setContext(previousContext => ({ ...previousContext, ...ctx }));
  }

  async function resetUserSelection() {
    const user = ldClient.getUser();
    if (user.custom.selection != DEFAULT) {
      const newUser = { ...user, custom: { ...user.custom, selection: DEFAULT } };
      await ldClient.identify(newUser);
    }
  };

  useEffect(() => {
    updateThemeInfo(demoTheme)
      .then(resetUserSelection)
      .catch(e => console.error(e));
  }, [demoTheme]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, showQRCode: demoQRCode }));
  }, [demoQRCode]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, qrCodeForWebPage: demoQRCodeWebPage }));
  }, [demoQRCodeWebPage]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, soundEnabled: demoSoundEnabled }));
  }, [demoSoundEnabled]);

  // useEffect(() => {
  //   //setContext(previousContext => ({ ...previousContext, demoAdmin: demoAdmin }));
  // }, [demoAdmin]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, demoBroken: demoBroken }));
  }, [demoBroken]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, demoServerBroken: demoServerBroken }));
  }, [demoServerBroken]);

  return (
    <ChakraProvider theme={theme.current}>
      <DemoContext.Provider value={{ context, setContext }}>
        <Flex direction="column" w="100%" m="0 auto">
          <Navigation />
          <Hero />
        </Flex>
      </DemoContext.Provider>
    </ChakraProvider>
  );
}

export default App;