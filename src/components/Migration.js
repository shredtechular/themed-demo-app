import React, { useState, useEffect, useCallback, memo } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, MarkerType, Background, Handle } from 'react-flow-renderer';
import { Box, Switch } from '@chakra-ui/react';

function FFToggleNode() {
    return memo(() => {
        return (
            <>
                <Handle
                    type="target"
                    position="left"
                    isConnectable={false}
                />
                <Switch size='lg' />
                <Handle
                    type="source"
                    position="right"
                    id="a"
                    isConnectable={false}
                />
            </>
        );
    });
}

const nodeTypes = {
    toggleNode: FFToggleNode(),
};

const CustomNodeFlow = () => {

    const nodes = [{
        id: '1',
        type: 'input',
        data: { label: 'App' },
        position: { x: 0, y: 50 },
        style: { borderRadius: 30 },
        sourcePosition: 'right',
    },
    {
        id: '2',
        type: 'toggleNode',
        style: { padding: 6 },
        position: { x: 300, y: 50 },
    },
    {
        id: '3',
        type: 'output',
        data: { label: 'MongoDB' },
        position: { x: 650, y: 25 },
        targetPosition: 'left',
    },
    {
        id: '4',
        type: 'output',
        data: { label: 'DynamoDB' },
        position: { x: 650, y: 100 },
        targetPosition: 'left',
    }];

    const edges = [{
        id: 'e1-2',
        source: '1',
        target: '2',
        animated: false
    },
    {
        id: 'e2a-3',
        source: '2',
        target: '3',
        sourceHandle: 'a',
        animated: true,
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        label: '100%'
    },
    {
        id: 'e2a-4',
        source: '2',
        target: '4',
        sourceHandle: 'a',
        animated: false,
        markerEnd: {
            type: MarkerType.ArrowClosed,
        },
        label: '0%'
    }];

    return (
        <Box border='1px solid blue' w='100%' h='800px'>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                defaultZoom={0}
                fitView
                attributionPosition="bottom-left">
                <Background />
                <Controls />
            </ReactFlow>
        </Box>
    );
};

export default CustomNodeFlow;