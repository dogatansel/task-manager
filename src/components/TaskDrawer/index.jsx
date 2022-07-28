import React from 'react';
import Navbar from '../Navbar';
import NewFolderDialog from '../FolderDialog';
import { useState, useEffect } from 'react';
import { Typography, Box, CssBaseline, ListItem, ListItemText, ListItemButton, List, Drawer, Button } from '@mui/material';
//import TaskBoard from '../TaskBoard';

const drawerWidth = 240;

export default function TaskDrawer() {
    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState(["To Do", "Done"]);
    const [folderInput, setFolderInput] = useState([""]);
    const [selectedFolder, setSelectedFolder] = useState("");

    const handleClickOpen = () => {
        setOpen(true);

    };

    useEffect(() => {
        console.log("folders", folders)
    }, [folders])

    return (
        
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            
            <Navbar 
                drawerWidth={drawerWidth}
                folder={selectedFolder}
            />
            
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
                    {folders.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton align="justify" onClick={() => setSelectedFolder(text)}>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                        <Button onClick={(e) => this.deleteRow(text, e)}>Delete</Button>
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

        </Box>
    );
}