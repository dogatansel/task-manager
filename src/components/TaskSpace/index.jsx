import React from 'react';
import Navbar from "../Navbar";
import TaskBoard from "../TaskBoard";
import { Box } from '@mui/material';

export default function TaskSpace({drawerWidth}) {
    return (
        <Box component="nav" sx={{ display: 'block', width: 1, height: 1 }}>

            <Navbar drawerWidth={drawerWidth}/>
            <TaskBoard/>

        </Box>
    );
}