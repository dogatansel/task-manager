import React from 'react';
import Navbar from '../Navbar';
import TaskBoard from '../TaskBoard';
import TaskDrawer from '../TaskDrawer';
import { useState, createContext } from 'react';
import { Box, CssBaseline } from '@mui/material';

const drawerWidth = 240;
export const TasksContext = createContext();
export const FolderContext = createContext();

export default function TaskPage() {
    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState([{folderName: "To Do", folderTasks: []},{folderName: "Done", folderTasks: []}]);
    const [folderInput, setFolderInput] = useState("");
    const [selectedFolder, setSelectedFolder] = useState({folderName: "", folderTasks: []});
    const [currentTask, setCurrentTask] = useState({taskName: "", 
                                            projectName: "", assigneeName: "", 
                                            deadline: {}, subtasks: [], isDone: false});
    const [tasks, setTasks] = useState([]);

    return (
        
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <TasksContext.Provider value={{tasks: selectedFolder.folderTasks, setTasks, currentTask, setCurrentTask}}>
                <Navbar 
                    drawerWidth={drawerWidth}
                    folder={selectedFolder}
                    setSelectedFolder={setSelectedFolder}
                    folders={folders}
                    setFolders={setFolders}
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

                <FolderContext.Provider value={{selectedFolder, setSelectedFolder, folders, setFolders}}>
                    <TaskBoard/>
                </FolderContext.Provider>
                

            </TasksContext.Provider>
            
        </Box>
    );
}