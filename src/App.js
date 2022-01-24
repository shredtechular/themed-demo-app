import React, { useEffect, useState, createContext, useRef } from 'react';
import { ChakraProvider, Flex, extendTheme } from '@chakra-ui/react';
import { withLDConsumer, useFlags } from 'launchdarkly-react-client-sdk';
import Navigation from './components/Navigation';
import Hero from './components/Hero'
import './App.css'

export const DemoContext = createContext();

function App({ ldClient }) {
  const defaultContext = {
    theme: "Default",
    themeStyle: {
      colors: {
        brand: {
          title: "#ebff38",
          title_bg1: "#282828",
          title_bg2: "#1E1E1E"
        }
      },
      fonts: {}
    },
    heroImage: "themes/default/hero.webp",
    navLinks: [],
    itemType: "",
    clickSound: "themes/default/sound.mp3",
    defaultItemImage: "themes/default/default.png",
    items: []
  }
  const { demoTheme, demoSoundEnabled, demoQRCode, demoAdmin, demoBroken, demoServerBroken } = useFlags();
  const [context, setContext] = useState(defaultContext);
  const [theme, setTheme] = useState();
  const themeCache = useRef([]);

  async function updateTheme(theme) {
    let ctx = defaultContext;
    const cached = themeCache.current.find(t => (t.theme === theme));

    if (cached) {
      ctx = cached;
    } else {
      if (theme != 'Default') { //maybe move this to the public folder later
        const resp = await fetch(`themes/${demoTheme}/theme.json`);
        ctx = await resp.json();
      }
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
    console.log('demoTheme flag changed', demoTheme);
    updateTheme(demoTheme);
  }, [demoTheme]);

  useEffect(() => {
    console.log('showQRCode flag changed', demoQRCode);
    setContext(previousContext => ({ ...previousContext, showQRCode: demoQRCode }));
  }, [demoQRCode]);

  useEffect(() => {
    console.log('demoSoundEnabled flag changed', demoSoundEnabled);
    setContext(previousContext => ({ ...previousContext, soundEnabled: demoSoundEnabled }));
  }, [demoSoundEnabled]);

  useEffect(() => {
    console.log('demoadmin flag changed', demoAdmin);
    setContext(previousContext => ({ ...previousContext, demoAdmin: demoAdmin }));
  }, [demoAdmin]);

  useEffect(() => {
    console.log('demoBroken flag changed', demoBroken);
    setContext(previousContext => ({ ...previousContext, demoBroken: demoBroken }));
  }, [demoBroken]);

  useEffect(() => {
    console.log('demoServerBroken flag changed', demoServerBroken);
    setContext(previousContext => ({ ...previousContext, demoServerBroken: demoServerBroken }));
  }, [demoServerBroken]);

  useEffect(() => {
    //console.log('context.theme changed', context.theme);
  }, [context.theme]);

  useEffect(() => {
    //console.log('context.selecteditem changed', context.selectedItem);
  }, [context.selectedItem]);

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