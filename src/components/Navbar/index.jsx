import React from 'react';
import { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import NewTaskDialogue from '../CreateDialog';

function Navbar({drawerWidth, folder, setSelectedFolder, currentTask, setCurrentTask, tasks, setTasks, folders, setFolders}) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    useEffect(() => {
        console.log("Tasks (Navbar): ", tasks);
    }, [tasks])

    return(
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            color="default"
        >
            <Toolbar>
                
                <Typography variant="h5" noWrap component="div" paddingRight="20px">
                    {folder.folderName}
                </Typography>
                
                {folder.folderName === 'To Do'? 
                <Button 
                    display="inline-flex" 
                    variant="contained"
                    onClick={handleClickOpen}>
                        New Task
                </Button>
                :
                <Button 
                    display="inline-flex" 
                    variant="contained"
                    disabled
                    onClick={handleClickOpen}>
                        New Task
                </Button>}
                
                <NewTaskDialogue 
                    open={open} 
                    setOpen={setOpen}
                    folder={folder}
                    setSelectedFolder={setSelectedFolder}
                    folders={folders}
                    setFolders={setFolders}
                />

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;