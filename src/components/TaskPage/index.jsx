import React from 'react';
import Navbar from '../Navbar';
import TaskBoard from '../TaskBoard';
import TaskDrawer from '../TaskDrawer';
import { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';

const drawerWidth = 240;

export default function TaskPage() {
    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState([{folderName: "To Do", tasks: []},{folderName: "Done", tasks: []}]);
    const [folderInput, setFolderInput] = useState("");
    const [selectedFolder, setSelectedFolder] = useState({folderName: "", tasks: []});
    const [currentTask, setCurrentTask] = useState({taskName: "", 
                                            projectName: "", assigneeName: "", 
                                            deadline: {}, subtasks: [], isDone: false});
    const [tasks, setTasks] = useState([]);

    return (
        
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            
            <Navbar 
                drawerWidth={drawerWidth}
                folder={selectedFolder}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
                tasks={tasks}
                setTasks={setTasks}
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

            <TaskBoard
                tasks={tasks}
                setTasks={setTasks}
                currentTask={currentTask}
                setCurrentTask={setCurrentTask}
            />
        </Box>
    );
}