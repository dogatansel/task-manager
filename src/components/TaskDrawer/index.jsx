import React from 'react';
import NewFolderDialog from '../FolderDialog';
import { useEffect, useContext } from 'react';
import { Typography, ListItem, ListItemText, ListItemButton, List, Drawer, Button, Divider } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import { FolderContext } from '../TaskPage';

export default function TaskDrawer({open, setOpen, drawerWidth, folderInput, setFolderInput }) {

    const {folder, setSelectedFolder, folders, setFolders} = useContext(FolderContext);

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        //console.log("folders", folders)
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
            
            <Divider/>
            
            <List>
                {folders.map(({folderName, folderTasks}) => (   
                    <ListItem key={folderName} sx={{pl: 0, pr: 1, py: 0, '& .Mui-focused': { background: '#52525b'} }}>
                        
                        <ListItemButton align="justify" onClick={() => setSelectedFolder({folderName, folderTasks})}>
                            <ListItemText primary={folderName}/>
                        </ListItemButton>

                        {folderName !== folder.folderName ?
                        <FolderIcon/>
                        : 
                        <FolderOpenOutlinedIcon/>
                        }
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
            />

        </Drawer>
    );
}