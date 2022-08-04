import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Button, Divider } from '@mui/material';
import { ListItem, ListItemText, List  } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { TasksContext } from '../TaskPage';
import { FolderContext } from '../TaskPage';

export default function TaskCard(){

    const {tasks, setTasks, currentTask, setCurrentTask} = useContext(TasksContext);
    const {folder, setSelectedFolder, folders, setFolders} = useContext(FolderContext);
    const [subtask, setSubtask] = useState({title: "", subtaskDone: false});

    const handleIsDone = (aTask) => {
        const unfinishedSubtasks = (someSubtask) => someSubtask.subtaskDone === false ;
        const unfinished = aTask.subtasks.some(unfinishedSubtasks);

        if (unfinished) {
            alert("Your subtasks are not finished");
            return;
        } 
        else {
            setCurrentTask({...aTask, isDone: !aTask.isDone});
        }

        const _folders = [...folders];
        const toDoFolderIndex = _folders.findIndex((curr) => curr.folderName === 'To Do')
        const doneFolderIndex = _folders.findIndex((curr) => curr.folderName === 'Done')
        const currentTaskIndex = _folders[toDoFolderIndex].folderTasks.findIndex((curr) => curr.taskName === aTask.taskName)
        const doneTasksIndex = _folders[doneFolderIndex].folderTasks.length;

        _folders[doneFolderIndex].folderTasks[doneTasksIndex] = aTask;
        _folders[doneFolderIndex].folderTasks[doneTasksIndex].isDone = true;
        _folders[toDoFolderIndex].folderTasks.splice(currentTaskIndex, 1);

        setCurrentTask({taskName: "", 
            projectName: "", assigneeName: "", 
            deadline: {}, subtasks: [], isDone: false});
    }; 

    const handleSubtaskDone = (aTask, aTitle, status, index) => {
        setSubtask({title: aTitle, subtaskDone: true});

        const _tasks = [...tasks];
        const currentTaskIndex = _tasks.findIndex((curr) => aTask.taskName === curr.taskName)

        _tasks[currentTaskIndex].subtasks[index].subtaskDone = status
        setTasks([..._tasks])

        setCurrentTask({taskName: "", 
            projectName: "", assigneeName: "", 
            deadline: {}, subtasks: [], isDone: false});
        
    };

    useEffect(() => {
        /*
        console.log("subtask (taskcard): ", subtask);
        console.log("current task (taskcard): ", currentTask);
        console.log("tasks (taskcard): ", tasks);
        */
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
                            {aTask.subtasks.map((aSubtask, index) => {return (
                                !aTask.isDone ?
                                <ListItem key={aSubtask.title} disablePadding>

                                    <ListItemText>
                                        {aSubtask.title} 
                                    </ListItemText>
 
                                    <RadioGroup row>

                                        <FormControlLabel value="done" control={
                                            <Radio checked={aSubtask.subtaskDone} onClick={() => handleSubtaskDone(aTask, aSubtask.title, true, index)}/>
                                        } label="Done" />

                                        <FormControlLabel value="not done" control={
                                            <Radio checked={!aSubtask.subtaskDone} onClick={() => handleSubtaskDone(aTask, aSubtask.title, false, index)}/>
                                        } label="Not Done" />

                                    </RadioGroup>

                                </ListItem>
                                :
                                <ListItem key={aSubtask.title} disablePadding>

                                    <ListItemText>
                                        {aSubtask.title} - Subtask is done
                                    </ListItemText>

                                </ListItem>
                            );})}
                        </List>

                        <Divider />

                        <Typography variant="h6" color="text.secondary">
                            Task Deadline: {aTask.deadline? aTask.deadline.toDateString() : ""}
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