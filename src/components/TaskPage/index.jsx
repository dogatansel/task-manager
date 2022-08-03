import React from 'react';
import Navbar from '../Navbar';
import TaskBoard from '../TaskBoard';
import TaskDrawer from '../TaskDrawer';
import { useState, createContext } from 'react';
import { Box, CssBaseline } from '@mui/material';

const drawerWidth = 240;
const CurrentTaskContext = createContext();
export const TasksContext = createContext();

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

            <TasksContext.Provider value={{tasks, setTasks, currentTask, setCurrentTask}}>
                <Navbar 
                    drawerWidth={drawerWidth}
                    folder={selectedFolder}
                    setSelectedFolder={setSelectedFolder}
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask}
                    tasks={tasks}
                    setTasks={setTasks}
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
            
                <TaskBoard
                    tasks={tasks}
                    setTasks={setTasks}
                    currentTask={currentTask}
                    setCurrentTask={setCurrentTask}
                    selectedFolder={selectedFolder} 
                    setSelectedFolder={setSelectedFolder}
                />

            </TasksContext.Provider>
            
        </Box>
    );
}