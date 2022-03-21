import React, { useState, useContext } from 'react';
import { Code, HStack, chakra, Box, Table, Thead, Tr, Th, Tbody, Tfoot, Td, Button, VStack, SimpleGrid, TableCaption, Icon } from '@chakra-ui/react';
import { DemoContext } from '../App';

export default function Migration() {
    const { context } = useContext(DemoContext);
    const [db1Data, setDb1Data] = useState([]);
    const [db2Data, setDb2Data] = useState([]);
    //const [insertTarget, setInsertTarget] = useState('None');

    function makeDb1Row() {
        const key = context.ldClient.getUser().key + Date.now();
        return <Tr key={key}><Td>1</Td><Td>2</Td><Td>3</Td></Tr>;
    }

    function makeDb2Row() {
        const key = context.ldClient.getUser().key + Date.now();
        return <Tr key={key}><Td>1</Td><Td>2</Td><Td>3</Td><Td>4</Td></Tr>;
    }

    function makeDb2Columns() {

    }

    function getInsertTarget() {
        let target = 'None';
        if (context.db1Write) {
            target = 'db1';
        }
        if (context.db2Write) {
            target = 'db2';
        }
        if (context.db1Write && context.db2Write) {
            target = 'db1, db2';
        }
        return target;
    }

    function insertRecord() {
        if (context.db1Write) {
            setDb1Data([...db1Data, makeDb1Row()]);
        }
        if (context.db2Write) {
            setDb2Data([...db2Data, makeDb2Row()]);
        }
    }

    function reset() {
        setDb1Data([]);
        setDb2Data([]);
    }

  


    return (
        <VStack spacing={1} align='stretch' p={1}>
            <HStack spacing={2} direction="row">
                <Box>
                    <Button onClick={insertRecord}>Insert Record</Button>
                </Box>
                <Box whiteSpace="nowrap">
                    <chakra.span fontSize="lg" fontWeight="extrabold">Target(s): </chakra.span>
                    <chakra.span>{getInsertTarget()}</chakra.span>
                </Box>
                <Box w="100%" textAlign="right">
                    <Button onClick={reset}>Reset</Button>
                </Box>
            </HStack>
            <Box>
                    <SimpleGrid columns={8} border="1px solid blue">
                        <Box border="1px solid red">
                            
                        </Box>
                    </SimpleGrid>
                </Box>
            <Box>
                <SimpleGrid columns={2} spacing={2}>
                    <Box p={1}>
                        <chakra.span mb={2} fontSize="lg" fontWeight="extrabold">Current Database: </chakra.span>
                        <chakra.span>db1</chakra.span>
                        <Table size='sm' colorScheme='purple' variant="striped">
                            <TableCaption>Table1</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>A</Th>
                                    <Th>B</Th>
                                    <Th>C</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {db1Data}
                            </Tbody>

                        </Table>
                    </Box>
                    <Box p={1}>
                        <chakra.span mb={2} fontSize="lg" fontWeight="extrabold">New Database: </chakra.span>
                        <chakra.span>db2</chakra.span>
                        <Table size='sm' colorScheme='teal' variant="striped">
                            <TableCaption>Table1</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>A</Th>
                                    <Th>B</Th>
                                    <Th>C</Th>
                                    <Th>D</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {db2Data}
                            </Tbody>
                        </Table>
                    </Box>
                </SimpleGrid>
                <Box>
                    <Code variant="outline" colorScheme="blue">
                        asdfasdfHello
                        asdf
                        adsf<br />
                        adsf
                        <Code>adbd</Code>
                        asdff</Code><br />

                </Box>
            
            </Box>
        </VStack>

    );
};