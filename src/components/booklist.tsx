import React, { useEffect } from "react";
import { AppState } from "../store/initialState";
import { Book } from "../types/book";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { selectBook } from "../actions/selectBook";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { getBooks } from "../actions/getBooks";
import BookPanel from "./addbook";

const useStyles = makeStyles(() =>
  createStyles({
    bookListRoot: {
      overflow: "auto",
      maxHeight: "100%",
      height: "50vh"
    },
    addBookPanel: {
      width: "100%"
    }
  })
);

const mapStateToProps = (state: AppState) => {
  return {
    books: state.general.books,
    booksLoaded: state.general.booksLoaded,
    gettingBooks: state.general.gettingBooks
  };
};

interface BookListProps {
  books: Book[];
  booksLoaded: boolean;
  dispatch: Function;
  gettingBooks: boolean;
  selectedBookId: number;
  setSelectedBookId: Function;
}

function BookList(props: BookListProps) {
  const classes = useStyles();
  const { selectedBookId, setSelectedBookId } = props;

  const bookClicked = (book: Book) => {
    props.dispatch(selectBook(book));
    setSelectedBookId(book.id);
  };

  useEffect(() => {
    if (!props.booksLoaded) {
      props.dispatch(getBooks());
    }
  });

  return (
    <Paper>
      <Card>
        <CardContent>
          {props.gettingBooks ? <CircularProgress /> : null}
          <List className={classes.bookListRoot}>
            {props.books.map((book: Book) => (
              <ListItem
                selected={book.id === selectedBookId}
                key={book.id}
                button
                onClick={() => bookClicked(book)}
              >
                <ListItemText primary={book.title} secondary={book.author} />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions>
          <ExpansionPanel className={classes.addBookPanel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Add Book</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <BookPanel />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </CardActions>
      </Card>
    </Paper>
  );
}

export default connect(mapStateToProps)(BookList);
