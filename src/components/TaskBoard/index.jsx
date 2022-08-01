import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Typography, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Button, Divider } from '@mui/material';
import { ListItem, ListItemText, ListItemButton, List  } from '@mui/material';
import { TasksContext } from '../TaskPage';


export default function TaskBoard(/*tasks,*/ setTasks, currentTask, setCurrentTask, selectedFolder){

    const tasks = useContext(TasksContext);
    //console.log("Taskboard tasks: ", tasks);
    //console.log("Taskboard current task: ", tasks[0]);
    //console.log("Taskboard current task: ", currentTask);
    //console.log("Taskboard current task name: ", currentTask.taskName);

    return (
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title="Task Name"
                    subheader="Selected Folder (PUT ICON KARDEŞM)"
                    
                />   

                <Divider />

                <CardContent>
                    <Typography variant="h5" color="text.secondary">
                       {tasks.length > 0 && tasks[0].assigneeName}
                    </Typography>

                    <Divider />

                    <List>
                        <ListItem disablePadding>
                            <ListItemText primary="some subtask item"/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary="another subtask item"/>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText primary="last subtask item"/>
                        </ListItem>
                    </List>

                    <Divider />

                    <Typography variant="h5" color="text.secondary">
                        Due: Deadline
                    </Typography>
                </CardContent>
            </Card>
        {/*tasks.map(({taskName, projectName, assigneeName, 
                            deadline, subtasks, isDone}, index) => (
                
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader key={taskName}
                    title={taskName}
                    subheader="September 14, 2016"
                />   
                
                <CardMedia
                    component="img"
                    height="194"
                    image="/static/images/cards/paella.jpg"
                    alt="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        This impressive paella is a perfect party dish and a fun meal to cook
                        together with your guests. Add 1 cup of frozen peas along with the mussels,
                        if you like.
                    </Typography>
                </CardContent>
            </Card>
                            ))*/}
        </Box>
    );

}