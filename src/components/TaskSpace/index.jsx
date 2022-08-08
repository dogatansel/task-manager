import React from 'react';
import Navbar from "../Navbar";
import TaskBoard from "../TaskBoard";
import { Box } from '@mui/material';

export default function TaskSpace({drawerWidth}) {
    return (
        <Box sx={{ display: 'flex' }}>
            
            <TaskBoard/>
            <Navbar drawerWidth={drawerWidth}/>
        </Box>
    );
}