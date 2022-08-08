import React from 'react';
import { Box, Toolbar } from '@mui/material';
import TaskCard from '../TaskCard';

export default function TaskBoard(){

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <Toolbar />
            <TaskCard/>
        </Box>
    );

}