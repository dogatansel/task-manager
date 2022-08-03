import React from 'react';
import { Box } from '@mui/material';
import TaskCard from '../TaskCard';

export default function TaskBoard(tasks, setTasks, currentTask, setCurrentTask, selectedFolder, setSelectedFolder){

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <TaskCard
                tasks={tasks}
                currentTask={currentTask} 
                setCurrentTask={setCurrentTask} 
                selectedFolder={selectedFolder} 
                setSelectedFolder={setSelectedFolder}
            />
        </Box>
    );

}