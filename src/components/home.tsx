import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { AppState } from "../store/initialState";
import { connect } from "react-redux";
import AudioPlayer from "./audioplayer";
import BookCard from "./bookcard";
import BookList from "./booklist";
import Playlist from "./playlist";

const useStyles = makeStyles(() =>
  createStyles({
    gridItem: {
      marginLeft: "auto",
      marginRight: "auto"
    },
    subGrid: {
      marginLeft: "auto",
      marginRight: "auto",
      justify: "left"
    }
  })
);

interface HomeProps {
  loggedIn: boolean;
  dispatch: Function;
}

function Home(props: HomeProps) {
  const classes = useStyles();
  const history = useHistory();

  const [selectedBookId, setSelectedBookId] = useState(-1);

  useEffect(() => {
    if (!props.loggedIn) {
      history.push("/login");
    }
  }, [props.loggedIn, history]);

  return (
    <Grid container spacing={5}>
      <Grid item xs={4} className={classes.gridItem}>
        <BookList
          selectedBookId={selectedBookId}
          setSelectedBookId={setSelectedBookId}
        />
      </Grid>
      <Grid
        item
        container
        xs={6}
        spacing={5}
        direction={"column"}
        className={classes.subGrid}
      >
        <Grid item>
          <AudioPlayer />
        </Grid>
        <Grid item>
          <Playlist />
        </Grid>
        <Grid item>
          <BookCard selectedBookId={selectedBookId} />
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    loggedIn: state.general.user !== undefined
  };
};

export default connect(mapStateToProps)(Home);
