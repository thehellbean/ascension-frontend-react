import React, { useState, useEffect, useCallback } from "react";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import PauseIcon from "@material-ui/icons/Pause";
import PlayIcon from "@material-ui/icons/PlayArrow";
import NextIcon from "@material-ui/icons/SkipNext";
import ProgressBar from "./progressbar";
import { AppState } from "../store/initialState";
import { Audio as BookAudio } from "../types/audio";
import { Book } from "../types/book";
import { updateAudioProgress } from "../actions/updateAudioProgress";

interface AudioPlayerProps {
  audioPath: string;
  audioObject?: BookAudio;
  audioObjectBook?: Book;
  playlistHasItems: boolean;
  dispatch: Function;
}

export const parseTimeToString = (time: number) => {
  let minutes = "" + Math.trunc(time / 60);
  let seconds = "" + Math.trunc(time % 60);

  if (minutes.length < 2) {
    minutes = "0" + minutes;
  }
  if (seconds.length < 2) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
};

const getBookFromAudio = (state: AppState, audio?: BookAudio) => {
  if (audio) {
    return state.general.books.find(book => book.id === audio.book_id);
  }
};

const mapStateToProps = (state: AppState) => {
  return {
    audioPath: state.media.audioPath,
    audioObject: state.media.activeAudio,
    audioObjectBook: getBookFromAudio(state, state.media.activeAudio),
    playlistHasItems: state.media.playlist.length > 0
  };
};

const useStyles = makeStyles(() =>
  createStyles({
    playerPaper: {
      height: 200,
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      padding: 24,
      textAlign: "center"
    },
    mediaButton: {
      marginTop: 16,
      marginBottom: 16,
      marginLeft: 8,
      marginRight: 8
    }
  })
);

const AudioPlayer = (props: AudioPlayerProps) => {
  const {
    audioPath,
    audioObject,
    audioObjectBook,
    playlistHasItems,
    dispatch
  } = props;
  const [playing, setPlaying] = useState(false);
  const [audioElement] = useState(new Audio());
  const [playProgress, setPlayProgress] = useState(0);
  const [bufferedRange, setBufferedRange] = useState(0);
  const [durationString, setDurationString] = useState("--:--");
  const [progressString, setProgressString] = useState("--:--");
  const classes = useStyles();

  const updateProgress = useCallback(() => {
    setProgressString(parseTimeToString(audioElement.currentTime));
    setPlayProgress((100 * audioElement.currentTime) / audioElement.duration);

    if (audioElement.buffered.length > 0) {
      setBufferedRange(
        audioElement.buffered.end(audioElement.buffered.length - 1)
      );
    }
  }, [audioElement]);

  useEffect(() => {
    audioElement.onloadeddata = () => {
      setDurationString(parseTimeToString(audioElement.duration));

      if (audioObject !== undefined) {
        if (audioElement.duration - audioObject.progress > 2) {
          audioElement.currentTime = audioObject.progress;
        }
      }
    };

    audioElement.onended = () => {
      if (playlistHasItems) {
        dispatch({
          type: "NEXT_AUDIO"
        });
      } else {
        setPlaying(false);
        if (audioObject) {
          dispatch(updateAudioProgress(audioElement.currentTime, audioObject));
        }
      }
    };
  }, [audioElement, playlistHasItems, dispatch, audioObject]);

  useEffect(() => {
    if (audioPath !== "") {
      audioElement.src = audioPath;
      setPlaying(true);
      audioElement.play();

      updateProgress();
    }

    return () => {
      audioElement.pause();
    };
  }, [updateProgress, audioObject, audioPath, audioElement]);

  useEffect(() => {
    if (playing) {
      audioElement.play();
    } else {
      audioElement.pause();

      if (audioObject && audioElement.duration) {
        dispatch(updateAudioProgress(audioElement.currentTime, audioObject));
      }
    }
  }, [audioObject, dispatch, playing, audioElement]);

  useEffect(() => {
    const intervalId = setInterval(updateProgress, 50);

    return () => clearInterval(intervalId);
  });

  const progressBarUpdate = (progress: number) => {
    audioElement.currentTime = progress * audioElement.duration;
  };

  return (
    <Paper className={classes.playerPaper}>
      <Typography variant="h5">
        {audioObject !== undefined ? audioObject.title : "-"}
      </Typography>
      <Typography>
        {audioObjectBook !== undefined ? audioObjectBook.title : "-"}
      </Typography>
      <Typography>
        {progressString} / {durationString}
      </Typography>
      <Fab
        size="small"
        className={classes.mediaButton}
        disabled={audioPath === ""}
        onClick={() => setPlaying(!playing)}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </Fab>
      <Fab
        size="small"
        className={classes.mediaButton}
        disabled={!playlistHasItems}
        onClick={() => dispatch({ type: "NEXT_AUDIO" })}
      >
        <NextIcon />
      </Fab>
      <ProgressBar
        buffered={(100 * bufferedRange) / audioElement.duration}
        progress={playProgress}
        onSeek={progressBarUpdate}
      />
    </Paper>
  );
};

export default connect(mapStateToProps)(AudioPlayer);
