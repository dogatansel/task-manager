import React from 'react';
import Navbar from '../Navbar';
import TaskBoard from '../TaskBoard';
import TaskDrawer from '../TaskDrawer';
import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';

const drawerWidth = 240;

export default function TaskPage() {
    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState(["To Do", "Done"]);
    const [folderInput, setFolderInput] = useState([""]);
    const [selectedFolder, setSelectedFolder] = useState("");

    return (
        
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            
            <Navbar 
                drawerWidth={drawerWidth}
                folder={selectedFolder}
            />
            
            <TaskDrawer
                open={open} 
                setOpen={setOpen}
                drawerWidth={drawerWidth} 
                folders={folders} 
                setFolders={setFolders} 
                folderInput={folderInput} 
                setFolderInput={setFolderInput} 
                selectedFolder={selectedFolder} 
                setSelectedFolder={setSelectedFolder} 
            />

            <TaskBoard/>
        </Box>
    );
}