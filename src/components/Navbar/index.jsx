import React from 'react';
import { useEffect, useState, useContext} from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import NewTaskDialogue from '../CreateDialog';
import { FolderContext } from '../TaskPage';

function Navbar({drawerWidth, tasks}) {

    const {folder, setSelectedFolder, folders, setFolders} = useContext(FolderContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log("open", true);
    };
    
    useEffect(() => {
        //console.log("Tasks (Navbar): ", tasks);
    }, [tasks])

    return(
        <AppBar
            position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            
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
                />

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;