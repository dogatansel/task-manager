import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TasksContext } from '../TaskPage';

export default function NewTaskDialogue({open, setOpen, folder,
    setSelectedFolder,
    folders,
    setFolders}) {

    const { tasks, setTasks, currentTask, setCurrentTask } = useContext(TasksContext);
    const [subtask, setSubtask] = useState({title: "", subtaskDone: false});

    const handleClose = () => {
        setOpen(false);
    };

    const handleCreateTask = () => {
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

        setCurrentTask({taskName: "", 
            projectName: "", assigneeName: "", 
            deadline: {}, subtasks: [], isDone: false});
        handleClose();
    };  

    const handleSubtaskFinished = () => {
        setSubtask({...subtask, subtaskDone: !(subtask.subtaskDone)});
    };

    const handleSaveSubtask = () => {
        setCurrentTask({...currentTask, subtasks: [...currentTask.subtasks, subtask]});
        setSubtask({title: "", subtaskDone: false});
    };

    /*
    const handleIsDone = () => {
        setCurrentTask({...currentTask, isDone: !(currentTask.isDone)});
    }; 
    */
    useEffect(() => {
        /*
        console.log("subtasks", currentTask.subtasks)
        console.log("(task dialog) current task: ", currentTask);
        console.log("(task dialog) tasks: ", tasks);
        console.log("(task dialog) folder: ", folder);
        console.log(folders);
        */
    }, [currentTask.subtasks, tasks, folder, folders] )
    
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create New Task</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    To create a new task, please fill in the information below and click create.
                </DialogContentText>

                <TextField
                    autoFocus
                    margin="dense"
                    id="task-name"
                    value={currentTask.taskName || ""}
                    onChange={(e) => setCurrentTask({...currentTask, taskName: e.target.value})}
                    label="Task Name"
                    type="task name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="project-name"
                    value={currentTask.projectName || ""}
                    onChange={(e) => setCurrentTask({...currentTask, projectName: e.target.value})}
                    label="Project Name"
                    type="project name"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="assignee-name"
                    value={currentTask.assigneeName || ""}
                    onChange={(e) => setCurrentTask({...currentTask, assigneeName: e.target.value})}
                    label="Assignee"
                    type="assignee name"
                    fullWidth
                    variant="standard"
                />
                
                <TextField
                    autoFocus
                    margin="dense"
                    id="subtask-name"
                    value={subtask.title || ""}
                    onChange={(e) => setSubtask({...subtask, title: e.target.value})}
                    label="Subtask Name"
                    type="subtask name"
                    variant="standard"
                />

                {subtask.subtaskDone === false 
                ? <Button onClick={handleSubtaskFinished}>Finished?</Button>
                : <Button onClick={handleSubtaskFinished} disabled color="success">Task Is Done</Button>}
                <Button onClick={handleSaveSubtask}>Save</Button>

                
                {(currentTask.subtasks) && (currentTask.subtasks).map((subtaskOnDialog) => { 
                    return(
                        <DialogContentText key={subtaskOnDialog.title}>
                                {subtaskOnDialog.title} - Subtask is {subtaskOnDialog.subtaskDone ? 'done' : 'not done'}  
                        </DialogContentText>);
                    })}
                
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Task Deadline"
                        value={currentTask.deadline}
                        onChange={(newValue) => setCurrentTask({...currentTask, deadline: newValue})}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                
                {/*currentTask.isDone === false 
                    ? <Button onClick={handleIsDone}>Finished?</Button>
                : <Button onClick={handleIsDone} color="success">Task Is Done</Button>*/}

            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreateTask}>Create</Button>
            </DialogActions>
        </Dialog>
    );
}