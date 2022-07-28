import React from 'react';
import { Button } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';

export default function NewFolderDialog({open, setOpen, folderInput, setFolderInput, folders, setFolders}) {

    const handleClose = () => {
    
        setOpen(false);
    };
    
    const handleFolderAddition = () => {
        console.log(folderInput);
        //folderInput !== "" ? folders.push(folderInput): console.log("");
        setFolders([...folders, folderInput]);
        console.log(folders);
        setFolderInput("");
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
            margin="dense"
            id="name"
            value={folderInput}
            onChange={(e) => setFolderInput(e.target.value)}
            label="Folder Name"
            type="folder name"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleFolderAddition}>Create</Button>
        </DialogActions>

      </Dialog>
    );
}