import React, { useEffect, useContext, useState } from 'react';
import { Accordion, AccordionItem, AccordionPanel, FormControl, Heading, FormLabel, AccordionButton, Box, AccordionIcon, Text, Stack, Select } from '@chakra-ui/react'
import { DemoContext } from '../App.js';
import FF from './FF.js';

export default function APIDemo() {
    const { context, setContext } = useContext(DemoContext);
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        let isMounted = true;
        FF.getDemoThemeVariations()
            .then(result => { if (isMounted) setThemes(result); });
        return () => { isMounted = false };
    }, []);

    function selectedThemeChanged(e) {
        const value = e.target.value;
        FF.updateDemoThemeFallthrough(value)
            .then(setContext(previousContext => ({ ...previousContext, theme: value })));
    }

    const AppThemes = () => {
        const component =
            <Box>
                <FormLabel fontWeight='md' fontSize='sm'>Demo Theme</FormLabel>
                <Select onChange={selectedThemeChanged} value={context.theme}>
                    {themes.map((item) =>
                        <option key={item.name} value={item.name}>{item.name}</option>
                    )}
                </Select>
            </Box>;
        return (themes.length > 0) ? component : null;
    }

    return (
        <Accordion allowToggle={true}>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Box flex='1' textAlign='left'>
                            <Text size='lg' fontWeight='bold'>API Showcase</Text>
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel>
                    <Box>
                        <FormControl mt={4} borderRadius='md' borderWidth={1} p={3}>
                            <FormLabel fontWeight='bold' fontSize='sm' borderBottomWidth={1} pb={3}>Flag Settings</FormLabel>
                            <Stack spacing="24px">
                                <AppThemes />
                            </Stack>
                        </FormControl>
                    </Box>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}