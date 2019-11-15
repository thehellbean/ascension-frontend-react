import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";
import { AppState } from "../store/initialState";
import { uploadAudio } from "../actions/newAudio";

interface DialogProps {
  open: boolean;
  handleClose: () => void;
  selectedBookId: number;
  dispatch: Function;
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedBookId: state.general.selectedBook
      ? state.general.selectedBook.id
      : -1
  };
};

function AudioFileUpload(props: DialogProps) {
  const { open, handleClose } = props;
  const [files, setFiles] = useState<File[]>([]);

  const convertFiles = (files: FileList): File[] => {
    let outFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      let item = files.item(i);
      if (item !== null) {
        outFiles.push(item);
      }
    }
    return outFiles;
  };

  const upload = () => {
    props.dispatch(uploadAudio(props.selectedBookId, files));
    setFiles([]);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="audio-upload-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Upload audio file</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can upload multiple audio files to be added to this book
        </DialogContentText>
        <List>
          {files.map((file: any) => (
            <ListItem key={file.name}>
              <ListItemText primary={file.name} />
            </ListItem>
          ))}
        </List>
        <input
          accept="audio/*"
          style={{ display: "none" }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={(event: any) => setFiles(convertFiles(event.target.files))}
        />
        <label htmlFor="raised-button-file">
          <Button variant="outlined" component="span">
            Select files
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={upload}>Upload</Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(mapStateToProps)(AudioFileUpload);
