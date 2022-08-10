import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Typography, Box, Card, CardHeader, CardContent, Button, Divider } from '@mui/material';
import { ListItem, ListItemText, List} from '@mui/material';
import { Radio, RadioGroup, FormControl, FormControlLabel, InputLabel, Select, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TasksContext } from '../TaskPage';
import { FolderContext } from '../TaskPage';

export default function TaskCard(){

    const {tasks, setTasks, currentTask, setCurrentTask} = useContext(TasksContext);
    const {folder, folders} = useContext(FolderContext);
    const [subtask, setSubtask] = useState({title: "", subtaskDone: false});
    const [somefolderName, setSomeFolderName] = useState("");

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
            deadline: new Date(), subtasks: [], isDone: false});
    }; 

    const handleSubtaskDone = (aTask, aTitle, status, index) => {
        setSubtask({title: aTitle, subtaskDone: true});

        const _tasks = [...tasks];
        const currentTaskIndex = _tasks.findIndex((curr) => aTask.taskName === curr.taskName)

        _tasks[currentTaskIndex].subtasks[index].subtaskDone = status
        setTasks([..._tasks])

        setCurrentTask({taskName: "", 
            projectName: "", assigneeName: "", 
            deadline: new Date(), subtasks: [], isDone: false});
        
    };

    const moveToFolder = (aTask) => {

        const unfinishedSubtasks = (someSubtask) => someSubtask.subtaskDone === false ;
        const unfinished = aTask.subtasks.some(unfinishedSubtasks);

        if (unfinished && somefolderName === 'Done') {
            alert("Your subtasks are not finished");
            return;
        } 
        else if (somefolderName === 'Done') {
            setCurrentTask({...aTask, isDone: !aTask.isDone});
        }
        else if (somefolderName === '') {
            alert("You must choose the folder where you will move this task first!");
            return;
        }

        const _folders = [...folders];
        
        const currentFolderIndex = _folders.findIndex((curr) => curr.folderName === folder.folderName);
        const currentTaskIndex = _folders[currentFolderIndex].folderTasks.findIndex((curr) => curr.taskName === aTask.taskName);

        const folderIndex = _folders.findIndex((curr) => curr.folderName === somefolderName);
        const folderTasksIndex = _folders[folderIndex].folderTasks.length;

        _folders[folderIndex].folderTasks[folderTasksIndex] = aTask;
        somefolderName === 'Done' ? _folders[folderIndex].folderTasks[folderTasksIndex].isDone = true
                        : _folders[folderIndex].folderTasks[folderTasksIndex].isDone = false;
        _folders[currentFolderIndex].folderTasks.splice(currentTaskIndex, 1);

        setCurrentTask({taskName: "", 
            projectName: "", assigneeName: "", 
            deadline: new Date(), subtasks: [], isDone: false});
        
        setSomeFolderName("");
    };

    useEffect(() => {

    }, [subtask, currentTask, tasks, folder, folders])

    return (
       
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap', m: 1, width: 1150, height: 1 }}>
            {tasks.map((aTask) => { return (

                <Card sx={{ width: 345, m: 2 }} key={aTask.taskName}>

                    <CardHeader
                        title={aTask.taskName}
                        subheader={aTask.projectName}
                    />  

                    <Divider />

                    <CardContent>
                        <Typography variant="h6" color="text.secondary" paddingBottom="10px">
                            Assignee: <AccountCircleIcon sx={{paddingTop: 1}}/> {aTask.assigneeName}
                        </Typography>

                        <Divider />

                        <List sx={{height: 200, overflow: 'auto'}}>
                            <Typography variant="h6" color="text.secondary">
                                Subtasks
                            </Typography>

                            {aTask.subtasks.map((aSubtask, index) => {return (
                                !aTask.isDone ?
                                <ListItem key={aSubtask.title} disablePadding>

                                    <ListItemText>
                                        {aSubtask.title} 
                                    </ListItemText>
 
                                    <RadioGroup row sx={{minWidth: 210, paddingRight: 1}}>

                                        <FormControlLabel value="not done" control={
                                            <Radio checked={!aSubtask.subtaskDone} onClick={() => handleSubtaskDone(aTask, aSubtask.title, false, index)}/>
                                        } label="Not Done" />

                                        <FormControlLabel value="done" control={
                                            <Radio checked={aSubtask.subtaskDone} onClick={() => handleSubtaskDone(aTask, aSubtask.title, true, index)}/>
                                        } label="Done" />

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

                        <Typography sx={{ marginTop: 1, marginBottom: 1}} variant="h6" color="text.secondary">
                            Deadline: {aTask.deadline.toDateString()}
                        </Typography>

                        <Divider />
                        
                        {!aTask.isDone?
                        <>
                            <Typography sx={{ marginTop: 1, marginBottom: 1}} variant="subtitle1" color="text.secondary">
                                Move Task to Another Folder
                            </Typography>

                            <FormControl size="small" sx={{ p: 0, marginRight: 2, marginBottom: 1, width: 180 }}>
                                <InputLabel id="folder-input-label">Folder</InputLabel>
                                <Select
                                    labelId="folder-select-label"
                                    id="folder-select"
                                    value={somefolderName || ""}
                                    label="Folder"
                                    onChange={(e) => setSomeFolderName(e.target.value)}
                                >
                                    {folders.map((aFolder) => { return(
                                        <MenuItem key={aFolder.folderName} value={aFolder.folderName}>
                                            {aFolder.folderName}
                                        </MenuItem>
                                    );})}

                                </Select>

                            </FormControl>
                            
                            <Button 
                                size="medium"
                                sx={{width: `calc(100% - 200px)`}}
                                onClick={() => moveToFolder(aTask)}
                                display="inline-flex" 
                                variant="contained"
                            >
                                Move
                            </Button>

                            <Divider />

                            <Button 
                                margin-top="15px"
                                fullWidth
                                onClick={() => handleIsDone(aTask)} 
                                display="inline-flex" 
                                variant="contained"
                            >
                                Finish Task
                            </Button>
                        </>
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