import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Button, Divider } from '@mui/material';
import { ListItem, ListItemText, ListItemButton, List  } from '@mui/material';
import { TasksContext } from '../TaskPage';


export default function TaskCard(/*tasks, currentTask, setCurrentTask,*/ selectedFolder, setSelectedFolder){

    const {tasks, setTasks, currentTask, setCurrentTask} = useContext(TasksContext);
    const [subtask, setSubtask] = useState({title: "", subtaskDone: false});

    const handleIsDone = (aTask) => {
        //console.log("Taskboard current task: ", aTask);
        //setCurrentTask(aTask);
        //console.log("Taskboard current task: ", currentTask);
        //setCurrentTask({...currentTask, isDone: !(currentTask.isDone)});
    }; 

    const handleSubtaskDone = (aTask, aTitle) => {
        setSubtask({title: aTitle, subtaskDone: true});
        setCurrentTask({...aTask, 
            subtasks: aTask.subtasks.map(aSubtask => {
                if (aSubtask.title === aTitle) 
                    return {...aSubtask, subtaskDone: true};
                else 
                    return {...aSubtask};
            }
        )});
        
        setTasks(current => 
            current.map(someTask => {
                if (someTask.taskName === aTask.taskName) 
                    return {...someTask, subtasks: aTask.subtasks.map(aSubtask => {
                        if (aSubtask.title === aTitle) 
                            return {...aSubtask, subtaskDone: true};
                        else 
                            return {...aSubtask};
                    })};
                else 
                    return {...someTask};
            }
        ));

        
    };

    useEffect(() => {
        console.log("subtask (taskcard): ", subtask);
        console.log("current task (taskcard): ", currentTask);
        console.log("tasks (taskcard): ", tasks);
    }, [subtask, currentTask, tasks])

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

                        <Button onClick={handleIsDone(aTask)}>
                            Finish Task
                        </Button>
                    </CardContent>
                </Card>);
            })}
        </Box>
    );
    

}