import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Button, Divider } from '@mui/material';
import { ListItem, ListItemText, ListItemButton, List  } from '@mui/material';
import { TasksContext } from '../TaskPage';


export default function TaskCard(selectedFolder, setSelectedFolder){

    const {tasks, setTasks, currentTask, setCurrentTask} = useContext(TasksContext);
    const [subtask, setSubtask] = useState({title: "", subtaskDone: false});

    const handleIsDone = (aTask) => {
        setCurrentTask({...aTask, isDone: !aTask.isDone});
    }; 

    const handleSubtaskDone = (aTask, aTitle) => {
        setSubtask({title: aTitle, subtaskDone: true});

        const _tasks = [...tasks];
        const currentTaskIndex = _tasks.findIndex((curr) => aTask.taskName === curr.taskName)
        const subTaskIndex = _tasks[currentTaskIndex].subtasks.findIndex((curr) => curr.title === aTitle)

        _tasks[currentTaskIndex].subtasks[subTaskIndex].subtaskDone = true
        setTasks([..._tasks])

        setCurrentTask({taskName: "", 
            projectName: "", assigneeName: "", 
            deadline: {}, subtasks: [], isDone: false});
        
    };

    useEffect(() => {
        
        console.log("subtask (taskcard): ", subtask);
        console.log("current task (taskcard): ", currentTask);
        console.log("tasks (taskcard): ", tasks);
        
    }, [subtask, currentTask, tasks])

    return (
       
        <Box>
            {tasks.map((aTask) => { return(
                <Card key={aTask.taskName} sx={{display: 'block', maxWidth: 345 }}>
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
                            {aTask.subtasks.map((aSubtask) => {return (
                                <ListItem key={aSubtask.title} disablePadding>
                                    {!aSubtask.subtaskDone ?
                                    <ListItemButton onClick={e => handleSubtaskDone(aTask, aSubtask.title)}>
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

                        {!aTask.isDone? 
                        <Button onClick={() => handleIsDone(aTask)}>
                            Finish Task
                        </Button>
                        :
                        <Typography variant="subtitle2" color="text.secondary">
                            Task Finished
                        </Typography>
                        }
                    </CardContent>
                </Card>);
            })}
        </Box>
    );
    

}