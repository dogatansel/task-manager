import React from 'react';
import { useState, useContext } from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Button, Divider } from '@mui/material';
import { ListItem, ListItemText, ListItemButton, List  } from '@mui/material';
import { TasksContext } from '../TaskPage';


export default function TaskCard(/*tasks,*/ currentTask, setCurrentTask, selectedFolder, setSelectedFolder){

    const tasks = useContext(TasksContext);
    const [subtask, setSubtask] = useState({title: "", subtaskDone: false});
    console.log("TaskCard tasks: ", tasks);
    //console.log("Taskboard current task: ", tasks[0]);
    //console.log("Taskboard current task: ", currentTask);
    //console.log("Taskboard current task name: ", currentTask.taskName);

    const handleIsDone = (aTask) => {
        console.log("Taskboard current task: ", aTask);
        //setCurrentTask(aTask);
        //console.log("Taskboard current task: ", currentTask);
        //setCurrentTask({...currentTask, isDone: !(currentTask.isDone)});
    }; 

    const handleSubtaskDone = (aTitle, index) => {
        setSubtask({title: aTitle, subtaskDone: true});
        console.log("subtask (taskcard): ", subtask);
        //setCurrentTask({...currentTask, subtasks: [...currentTask.subtasks, subtask]});
    };

    return (
       
        <Box>
            {tasks.map((aTask) => { return(
                <Card key={aTask.taskName} sx={{ maxWidth: 345 }}>
                    <CardHeader
                        title={aTask.taskName}
                        subheader={aTask.projectName}
                    />   

                    <Divider />

                    <CardContent>
                        <Typography variant="h5" color="text.secondary">
                            {aTask.assigneeName}
                        </Typography>

                        <Divider />

                        <List>
                            {aTask.subtasks.map((aSubtask, index) => {return (
                                <ListItem key={aSubtask.title} disablePadding>
                                    {!aSubtask.subtaskDone ?
                                    <ListItemButton onClick={e => handleSubtaskDone(aSubtask.title, index)}>
                                        <ListItemText>
                                            {aSubtask.title} - Subtask is not done
                                        </ListItemText>
                                    </ListItemButton>
                                    :
                                    <ListItemButton disabled>
                                        <ListItemText>
                                            {aSubtask.title} - Subtask is done
                                        </ListItemText>
                                    </ListItemButton>
                                    }
                                    
                                </ListItem>);
                            })}
                        </List>

                        <Divider />

                        <Typography variant="h6" color="text.secondary">
                            Task Deadline: {aTask.deadline.toDateString()}
                        </Typography>

                        <Button onClick={handleIsDone(aTask)}>
                            Finish Task
                        </Button>
                    </CardContent>
                </Card>);
            })}
        </Box>
    );
    

}