import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Typography, Box, Card, CardHeader, CardMedia, CardContent, CardActions, Button, Divider } from '@mui/material';
import { ListItem, ListItemText, ListItemButton, List  } from '@mui/material';
import { TasksContext } from '../TaskPage';


export default function TaskCard(/*tasks, */currentTask, setCurrentTask, selectedFolder, setSelectedFolder){

    const tasks = useContext(TasksContext);
    const [subtask, setSubtask] = useState({title: "", subtaskDone: false});
    console.log("TaskCard tasks: ", tasks);
    //console.log("Taskboard current task: ", tasks[0]);
    //console.log("Taskboard current task: ", currentTask);
    //console.log("Taskboard current task name: ", currentTask.taskName);

    const handleIsDone = () => {
        setCurrentTask({...currentTask, isDone: !(currentTask.isDone)});
    }; 

    const handleSubtaskDone = ({aTitle, aSubtaskDone}) => {
        setSubtask({title: aTitle, subtaskDone: !(aSubtaskDone)});
        setCurrentTask({...currentTask, subtasks: [...currentTask.subtasks, subtask]});
    };

    return (
       
        <Box>
            {tasks.map(({taskName, projectName, assigneeName, 
                            deadline, subtasks, isDone}) => { return(
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        title={taskName}
                        subheader={projectName}
                    />   

                    <Divider />

                    <CardContent>
                        <Typography variant="h5" color="text.secondary">
                            {assigneeName}
                        </Typography>

                        <Divider />

                        <List>
                            {subtasks.map(({aTitle, aSubtaskDone}) => {return (
                                <ListItem key={aTitle} disablePadding>
                                    {!aSubtaskDone ?
                                    <ListItemButton onClick={e => handleSubtaskDone({aTitle, aSubtaskDone})}>
                                        <ListItemText>
                                            {aTitle} - Subtask is not done
                                        </ListItemText>
                                    </ListItemButton>
                                    :
                                    <ListItemButton disabled>
                                        <ListItemText>
                                            {aTitle} - Subtask is done
                                        </ListItemText>
                                    </ListItemButton>
                                    }
                                    
                                </ListItem>);
                            })}
                        </List>

                        <Divider />

                        <Typography variant="h5" color="text.secondary">
                            Task Deadline: A deadline
                        </Typography>

                        <Button onClick={handleIsDone}>
                            Finish Task
                        </Button>
                    </CardContent>
                </Card>);
            })}
        </Box>
    );
    

}