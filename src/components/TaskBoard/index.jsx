import React from 'react';
import { Box } from '@mui/material';
import TaskCard from '../TaskCard';

export default function TaskBoard(){

    return (
        <Box
            component="main"
            sx={{  display: 'flex', flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <TaskCard />
        </Box>
    );

}