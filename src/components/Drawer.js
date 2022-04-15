import { useRef, useContext, useEffect, useState } from 'react';
import { DemoContext } from '../App.js';
import { useLDClient } from 'launchdarkly-react-client-sdk';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    FormLabel,
    useDisclosure,
    Select,
    Box
} from '@chakra-ui/react';

export default function SettingsDrawer() {
    const { context, setContext } = useContext(DemoContext);
    const ldClient = useLDClient();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const buttonRef = useRef();
    const [selectionValue, setSelectionValue] = useState();

    useEffect(() => {
        if (context.selectedItem) {
            const val = (context.selectedItem.name) ? context.selectedItem.name : context.NOP;
            setSelectionValue(val);
        }
    }, [context.selectedItem]);

    function selectedItemChanged(e) {
        const value = e.target.value;
        const user = ldClient.getUser();

        setSelectionValue(value);

        ldClient
            .identify({ ...user, custom: { ...user.custom, selection: value } })
            .then(() => {
                const selectedContextItem = (value != context.NOP) ?
                    context.items.find(item => item.name == value) :
                    context.NOP;
                setContext(previousContext => ({ ...previousContext, selectedItem: selectedContextItem }));
            });
    }

    return ((context.items?.length > 0) ?
        <Box>
            <Button ref={buttonRef} onClick={onOpen} border='2px' borderColor='gray.300' colorScheme='gray'>
                Settings
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={buttonRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton border='2px' borderColor='gray.300' />
                    <DrawerHeader borderBottomWidth='1px'>Settings</DrawerHeader>
                    <DrawerBody>
                        <Box>
                            <FormLabel fontWeight='bold'>Item Selection</FormLabel>
                            <Select onChange={selectedItemChanged} value={selectionValue}>
                                <option key={context.NOP} value={context.NOP}>Select a {context.itemType}</option>
                                {context.items.map(item =>
                                    <option key={item.name} value={item.name}>{item.name}</option>
                                )}
                            </Select>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
        : null);
}