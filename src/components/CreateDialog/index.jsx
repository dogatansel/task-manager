import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button, Typography } from '@mui/material';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { ListItem, ListItemText, List} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TasksContext } from '../TaskPage';
import { FolderContext } from '../TaskPage';

export default function NewTaskDialogue({open, setOpen}) {

    const {folder, setSelectedFolder, folders, setFolders} = useContext(FolderContext);
    const { tasks, setTasks, currentTask, setCurrentTask } = useContext(TasksContext);
    const [subtask, setSubtask] = useState({title: "", subtaskDone: false});

    const handleClose = () => {
        setOpen(false);
        setCurrentTask({taskName: "", 
            projectName: "", assigneeName: "", 
            deadline: new Date(), subtasks: [], isDone: false});
    };

    const handleCreateTask = () => {

        if (currentTask.taskName === '') {
            alert("You cannot create a task without giving it a name!")
            return;

        } else if (currentTask.assigneeName === '') {
            alert("You cannot create a task without assigning a person to the task!")
            return;
        }
            
        setTasks([...tasks, currentTask]);
    
        setSelectedFolder({...folder, folderTasks:[...folder.folderTasks, currentTask]});
        setFolders(current => 
            current.map(aFolder => {
                if (aFolder.folderName === folder.folderName) 
                    return {...aFolder, folderTasks: [...folder.folderTasks, currentTask]};
                else 
                    return {...aFolder};
            }
        ));

        handleClose();
    };  

    const handleSubtaskStatus = (aSubtask, status, index) => {

        const _subtasks = [...currentTask.subtasks];
        _subtasks[index] = {...aSubtask, subtaskDone: status};
        setCurrentTask({...currentTask, subtasks: _subtasks});
    };

    const handleAddSubtask = () => {

        if (subtask.title === ''){
            alert("You cannot add an empty subtask!")
            return;
        }
        setCurrentTask({...currentTask, subtasks: [...currentTask.subtasks, subtask]});
        setSubtask({title: "", subtaskDone: false});
    };

    useEffect(() => {

    }, [currentTask.subtasks, tasks, folder, folders] )
    
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Task</DialogTitle>

            <DialogContent component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch', p: 0},}}>
                <DialogContentText>
                    To create a new task, please fill in the information below and click create.
                </DialogContentText>

                <TextField
                    autoFocus
                    inputProps={{ style: { WebkitBoxShadow: "0 0 0 1000px #212121 inset" } }}
                    required
                    margin="dense"
                    id="task-name"
                    value={currentTask.taskName || ""}
                    onChange={(e) => setCurrentTask({...currentTask, taskName: e.target.value})}
                    label="Task Name"
                    type="task name"
                    variant="outlined"
                />
                <TextField
                    autoFocus
                    inputProps={{ style: { WebkitBoxShadow: "0 0 0 1000px #212121 inset" } }}
                    margin="dense"
                    id="project-name"
                    value={currentTask.projectName || ""}
                    onChange={(e) => setCurrentTask({...currentTask, projectName: e.target.value})}
                    label="Project Name"
                    type="project name"
                    variant="outlined"
                />
                <TextField
                    autoFocus
                    inputProps={{ style: { WebkitBoxShadow: "0 0 0 1000px #212121 inset" } }}
                    required
                    margin="dense"
                    id="assignee-name"
                    value={currentTask.assigneeName || ""}
                    onChange={(e) => setCurrentTask({...currentTask, assigneeName: e.target.value})}
                    label="Assignee"
                    type="assignee name"
                    variant="outlined"
                />

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        inputFormat="dd/MM/yyyy"
                        inputProps={{ style: { WebkitBoxShadow: "0 0 0 1000px #212121 inset" } }}
                        label="Task Deadline"
                        value={currentTask.deadline}
                        onChange={(newValue) => setCurrentTask({...currentTask, deadline: newValue})}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                
                <Box sx={{ display: 'block', flexGrow: 1}}> 

                    <TextField
                        autoFocus
                        inputProps={{ style: { WebkitBoxShadow: "0 0 0 1000px #212121 inset" } }}
                        margin="dense"
                        id="subtask-name"
                        value={subtask.title || ""}
                        onChange={(e) => setSubtask({...subtask, title: e.target.value})}
                        label="Subtask Name"
                        type="subtask name"
                        variant="outlined"
                    />
                    <Button 
                        size="large"
                        sx={{m: 1, width: `calc(100% - 330px)`}}
                        display="inline-flex" 
                        variant="contained" 
                        onClick={handleAddSubtask}
                    >
                        Add
                    </Button>

                    <List >
                        <Typography variant="subtitle1" color="text.secondary">
                            Subtasks
                        </Typography>
                    
                        {(currentTask.subtasks) && (currentTask.subtasks).map((subtaskOnDialog, index) => { 
                            return(
                                <ListItem key={subtaskOnDialog.title} disablePadding sx={{paddingLeft: 1}}>

                                    <ListItemText sx={{maxWidth: 250}}>
                                        {subtaskOnDialog.title} 
                                    </ListItemText>

                                    <RadioGroup row sx={{minWidth: 100, paddingRight: 1}}>
                                        <FormControlLabel value="not done" control={
                                                <Radio onClick={() => handleSubtaskStatus(subtaskOnDialog, false, index)}/>
                                        } label="Not Done" />

                                        <FormControlLabel value="done" control={
                                                <Radio onClick={() => handleSubtaskStatus(subtaskOnDialog, true, index)}/>
                                        } label="Done" />
                                    </RadioGroup>

                                </ListItem>
                            );                       
                        })}
                    </List>
                </Box>

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreateTask}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}