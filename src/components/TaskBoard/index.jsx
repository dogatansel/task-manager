import React from 'react';
import { Box } from '@mui/material';
import TaskCard from '../TaskCard';


export default function TaskBoard(selectedFolder, setSelectedFolder){

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <TaskCard
                selectedFolder={selectedFolder} 
                setSelectedFolder={setSelectedFolder}
            />
        </Box>
    );

}