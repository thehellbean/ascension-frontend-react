import React, { useState } from "react";
import { AppState } from "../store/initialState";
import { Book } from "../types/book";
import { Audio } from "../types/audio";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import AudioIcon from "@material-ui/icons/Audiotrack";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { selectAudio } from "../actions/selectAudio";
import { parseTimeToString } from "./audioplayer";
import AudioFileUpload from "./audiofileuploaddialog";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(() =>
  createStyles({
    audioListRoot: {
      overflow: "auto",
      maxHeight: "30vh"
    },
    bookCard: {
      height: "50%"
    }
  })
);

const mapStateToProps = (state: AppState) => {
  return {
    books: state.general.books
  };
};

interface BookCardProps {
  books: Book[];
  dispatch: Function;
  selectedBookId: number;
}

function BookCard(props: BookCardProps) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [activeAudio, setActiveAudio] = useState<null | Audio>(null);
  const open = Boolean(menuAnchor);

  const selectedBook = props.books.find(
    book => book.id === props.selectedBookId
  );

  const playAudio = (audio: Audio) => {
    if (selectedBook !== undefined) {
      props.dispatch(selectAudio(audio));
      const playedAudioIndex = selectedBook.audio.indexOf(audio);
      const queuedAudio = selectedBook.audio.filter(
        (_, index) => index > playedAudioIndex
      );

      props.dispatch({ type: "SET_PLAYLIST", data: queuedAudio });
    }
  };

  const handleAudioListClick = (event: any, audio: Audio) => {
    setMenuAnchor(event.currentTarget);
    setActiveAudio(audio);
  };

  const progressString = (audio: Audio) => `
    ${parseTimeToString(audio.progress)} / ${parseTimeToString(audio.length)}
  `;

  const audioListItem = (audio: Audio) => (
    <ListItem button onClick={() => playAudio(audio)} key={audio.id}>
      <ListItemIcon>
        <AudioIcon />
      </ListItemIcon>
      <ListItemText primary={audio.title} secondary={progressString(audio)} />
      <ListItemSecondaryAction>
        <IconButton
          onClick={event => handleAudioListClick(event, audio)}
          edge="end"
          aria-label="more-options"
        >
          <MoreHorizIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );

  const menuClickAddQueue = () => {
    props.dispatch({
      type: "ADD_TO_PLAYLIST",
      data: activeAudio
    });

    setMenuAnchor(null);
  };

  const menuClickDelete = () => {
    setMenuAnchor(null);
  };

  return (
    <Paper>
      <AudioFileUpload
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
      />
      {selectedBook ? (
        <Card>
          <CardHeader
            title={selectedBook.title}
            subheader={selectedBook.author}
            action={
              <IconButton aria-label="book-settings">
                {" "}
                <MoreVertIcon />{" "}
              </IconButton>
            }
          />
          <CardContent>
            <List className={classes.audioListRoot}>
              {selectedBook.audio.map(audioListItem)}
            </List>
            <Menu
              onClose={() => setMenuAnchor(null)}
              anchorEl={menuAnchor}
              open={open}
            >
              <MenuItem onClick={menuClickAddQueue}>Add to queue</MenuItem>
              <MenuItem onClick={menuClickDelete}>Delete</MenuItem>
            </Menu>
            <Button variant="contained" onClick={() => setDialogOpen(true)}>
              Add a file
            </Button>
          </CardContent>
        </Card>
      ) : null}
    </Paper>
  );
}

export default connect(mapStateToProps)(BookCard);
