import React from 'react';
import { Button } from '@mui/material';
import { useContext} from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import { FolderContext } from '../TaskPage';

export default function NewFolderDialog({open, setOpen, folderInput, setFolderInput}) {

    const {folder, setSelectedFolder, folders, setFolders} = useContext(FolderContext);

    const handleClose = () => {
        setFolderInput("");
        setOpen(false);
    };
    
    const handleFolderAddition = () => {
        setFolders([...folders, {folderName: folderInput, folderTasks: []}]);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>

            <DialogTitle>Create New Task Folder</DialogTitle>

            <DialogContent>
                <DialogContentText>
                    To create a new task folder, please enter the folder name and click create.
                </DialogContentText>
                
                <TextField
                    autoFocus
                    inputProps={{ style: { WebkitBoxShadow: "0 0 0 1000px #212121 inset" } }}
                    margin="dense"
                    id="name"
                    value={folderInput}
                    onChange={(e) => setFolderInput(e.target.value)}
                    label="Folder Name"
                    type="folder name"
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleFolderAddition}>Create</Button>
            </DialogActions>

        </Dialog>
    );
}