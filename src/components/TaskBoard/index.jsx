import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Typography, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Button, Divider } from '@mui/material';
import { ListItem, ListItemText, ListItemButton, List  } from '@mui/material';
import { TasksContext } from '../TaskPage';
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