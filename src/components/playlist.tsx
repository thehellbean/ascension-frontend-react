import React from "react";
import { connect } from "react-redux";
import { AppState } from "../store/initialState";
import { Audio } from "../types/audio";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SpeakerIcon from "@material-ui/icons/VolumeUp";
import { selectAudio } from "../actions/selectAudio";
import Divider from "@material-ui/core/Divider";

interface PlaylistProps {
  dispatch: Function;
  activeAudio?: Audio;
  playlist: Audio[];
}

const mapStateToProps = (state: AppState) => {
  return {
    playlist: state.media.playlist,
    activeAudio: state.media.activeAudio
  };
};

function Playlist(props: PlaylistProps) {
  const { activeAudio, playlist, dispatch } = props;

  const playAudioFromQueue = (audio: Audio) => {
    dispatch(selectAudio(audio));
    const playingAudioIndex = playlist.indexOf(audio);
    const queuedAudio = playlist.filter(
      (_, index) => index > playingAudioIndex
    );
    props.dispatch({ type: "SET_PLAYLIST", data: queuedAudio });
  };

  const playlistItem = (audio: Audio) => {
    return (
      <ListItem key={audio.id} button onClick={() => playAudioFromQueue(audio)}>
        <ListItemText primary={audio.title} />
      </ListItem>
    );
  };

  return (
    <Paper>
      <Card>
        <CardContent>
          {activeAudio ? (
            <>
              <ListItem button key={activeAudio.id}>
                <ListItemIcon>
                  <SpeakerIcon />
                </ListItemIcon>
                <ListItemText primary={activeAudio.title} />
              </ListItem>{" "}
              <Divider />
            </>
          ) : null}
          {playlist.length > 0 ? (
            <List>{playlist.map(playlistItem)}</List>
          ) : (
            <Typography variant="h6">Queue is empty!</Typography>
          )}
        </CardContent>
      </Card>
    </Paper>
  );
}

export default connect(mapStateToProps)(Playlist);
