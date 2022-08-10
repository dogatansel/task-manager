import React from 'react';
import TaskSpace from '../TaskSpace';
import TaskDrawer from '../TaskDrawer';
import { useState, createContext } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const drawerWidth = 240;
export const TasksContext = createContext();
export const FolderContext = createContext();
const theme = createTheme({
    palette: {
        mode: 'dark',

        primary: { //buttons
            main: '#f59e0b', //amber 500
            contrastText: '#ffffff',
        },
        background: {
            default: '#d4d4d8',
            paper: '#27272a',
        },

        custom: {
            light: '#ffa726',
            main: '#f57c00',
            dark: '#ef6c00',
            contrastText: 'rgba(0, 0, 0, 0.87)',
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
});

export default function TaskPage() {
    const [open, setOpen] = useState(false);
    const [folders, setFolders] = useState([{folderName: "To Do", folderTasks: []},
                                            {folderName: "Done", folderTasks: []}]);
    
    const [folderInput, setFolderInput] = useState("");
    const [selectedFolder, setSelectedFolder] = useState({folderName: "", folderTasks: []});

    const [currentTask, setCurrentTask] = useState({taskName: "", 
                                            projectName: "", assigneeName: "", 
                                            deadline: new Date(), subtasks: [], isDone: false});
    const [tasks, setTasks] = useState([]);

    return (
        
        <Box sx={{ display: 'flex', width: 1, height: 1 }}>
            
            <ThemeProvider theme={theme}>
                <CssBaseline />
                
                <FolderContext.Provider value={{folder: selectedFolder, setSelectedFolder, folders, setFolders}}>
                    <TasksContext.Provider value={{tasks: selectedFolder.folderTasks, setTasks, currentTask, setCurrentTask}}>
                        
                        <TaskDrawer
                            open={open} 
                            setOpen={setOpen}
                            drawerWidth={drawerWidth}
                            folderInput={folderInput} 
                            setFolderInput={setFolderInput} 
                        />
                        <TaskSpace drawerWidth={drawerWidth}/>

                    </TasksContext.Provider>
                </FolderContext.Provider>

            </ThemeProvider>
            
        </Box>
    );
}