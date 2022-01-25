import React, { useEffect, useState, createContext, useRef } from 'react';
import { ChakraProvider, Flex, extendTheme } from '@chakra-ui/react';
import { withLDConsumer, useFlags } from 'launchdarkly-react-client-sdk';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import './App.css'

export const DemoContext = createContext();

function App({ ldClient }) {
  const { demoTheme, demoSoundEnabled, demoQRCode, demoAdmin, demoBroken, demoServerBroken } = useFlags();
  const [context, setContext] = useState({});
  const [theme, setTheme] = useState();
  const themeCache = useRef([]);

  async function updateTheme(theme) {
    let ctx = themeCache.current.find(t => (t.theme === theme));

    if (!ctx) {
      const resp = await fetch(`themes/${demoTheme}/theme.json`);
      ctx = await resp.json();
      themeCache.current.push(ctx);
    }

    ctx = {
      ...ctx,
      ldClient: ldClient,
      avatar: ldClient.getUser().avatar,
      soundEnabled: demoSoundEnabled,
      showQRCode: demoQRCode,
      demoAdmin: demoAdmin,
      selectedItem: 'DEFAULT',
      NOP: 'DEFAULT'
    };

    setTheme(extendTheme(ctx.themeStyle));
    setContext(previousContext => ({ ...previousContext, ...ctx }));
  }

  useEffect(() => {
    updateTheme(demoTheme);
  }, [demoTheme]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, showQRCode: demoQRCode }));
  }, [demoQRCode]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, soundEnabled: demoSoundEnabled }));
  }, [demoSoundEnabled]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, demoAdmin: demoAdmin }));
  }, [demoAdmin]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, demoBroken: demoBroken }));
  }, [demoBroken]);

  useEffect(() => {
    setContext(previousContext => ({ ...previousContext, demoServerBroken: demoServerBroken }));
  }, [demoServerBroken]);

  return (
    <ChakraProvider theme={theme}>
      <DemoContext.Provider value={{ context, setContext }}>
        <Flex direction="column" w="100%" m="0 auto">
          <Navigation />
          <Hero />
        </Flex>
      </DemoContext.Provider>
    </ChakraProvider>
  );
}

export default withLDConsumer()(App);