import React from 'react';
import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import NewTaskDialogue from '../CreateDialog'

function Navbar({drawerWidth, folder}) {

    const [open, setOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState({taskName: "", 
                                            projectName: "", assigneeName: "", 
                                            deadline: {}, subtasks: {}, isDone: false});
    const [tasks, setTasks] = useState({})

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    useEffect(() => {
        console.log("tasks", tasks)
    }, [tasks])

    return(
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            color="default"
        >
            <Toolbar>
                <Typography variant="h5" noWrap component="div">
                    {folder}
                </Typography>
                
                <Button 
                    display="inline-flex" 
                    variant="contained"
                    onClick={handleClickOpen}>
                        New Task
                </Button>
                
                <NewTaskDialogue 
                    open={open} 
                    setOpen={setOpen}
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask} 
                    tasks={tasks}
                    setTasks={setTasks}
                />

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;