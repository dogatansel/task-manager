import React from 'react';
import NewFolderDialog from '../FolderDialog';
import { useEffect } from 'react';
import { Typography, ListItem, ListItemText, ListItemButton, List, Drawer, Button } from '@mui/material';

export default function TaskDrawer({open, setOpen, 
    drawerWidth, folders, setFolders, folderInput, 
    setFolderInput, selectedFolder, setSelectedFolder }) {

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        console.log("folders", folders)
    }, [folders])

    return (
        
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Typography variant="h4" noWrap component="div" padding="10px" align="left">
                Task Folders
            </Typography>
            
            <List>
                {folders.map(({folderName, tasks}) => (
                <ListItem key={folderName} disablePadding>
                    <ListItemButton align="justify" onClick={() => setSelectedFolder({folderName, tasks})}>
                        <ListItemText primary={folderName}/>
                    </ListItemButton>
                    <Button disabled>Delete</Button>
                </ListItem>
                ))}
            </List>

            <Button 
                display="inline-flex" 
                variant="contained" 
                onClick={handleClickOpen}>
                    New Folder
            </Button>

            <NewFolderDialog 
                open={open} 
                setOpen={setOpen}
                folderInput={folderInput} 
                setFolderInput={setFolderInput} 
                folders={folders}
                setFolders={setFolders}
            />

        </Drawer>
    );
}