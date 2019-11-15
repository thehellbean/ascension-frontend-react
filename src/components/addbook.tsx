import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { addBook } from "../actions/addBook";

const useStyles = makeStyles(() =>
  createStyles({
    textField: {
      width: "100%"
    },
    submitButton: {
      marginLeft: 8
    }
  })
);

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addBook: (title: string, author: string) => dispatch(addBook(title, author))
  };
};

interface BookPanelProps {
  addBook: Function;
}

interface FormBook {
  authors: string;
  title: string;
  isbn: string;
}

function BookPanel(props: BookPanelProps) {
  const { addBook } = props;
  const [title, setTitle] = useState("");
  const [authors, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [autocompleteOptions, setAutocompleteOptions] = useState<FormBook[]>(
    []
  );
  const [
    filteredAutocompleteOptions,
    setFilteredAutocompleteOptions
  ] = useState<FormBook[]>([]);
  const [titleOpen, setTitleOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [requestedData, setRequestedData] = useState<FormBook | undefined>(
    undefined
  );

  const checkFetchOk = (): boolean => {
    return (
      title.length + authors.length + isbn.length >= 3 &&
      (requestedData ? requestedData.title !== title || requestedData.authors !== authors : true)
    );
  };

  const getAutocompleteOptions = async () => {
    if (checkFetchOk()) {
      console.log("Fetching..");
      setLoading(true);
      setRequestedData({ title, authors, isbn });
      const url = new URL("http://localhost:4000/api/v1/books/isbn");
      url.search = new URLSearchParams({
        title,
        author: authors,
        isbn
      }).toString();
      fetch(url.toString(), {
        credentials: "include"
      })
        .then((response: any) => response.json())
        .then((json: any) => {
          setLoading(false);
          setAutocompleteOptions(
            json.data.map((el: any) => {
              if (el.authors) {
                el.authors = el.authors.join(", ");
              } else {
                el.authors = "";
              }

              return el;
            })
          );
        });
    }
  };

  useEffect(() => {
    setFilteredAutocompleteOptions(
      autocompleteOptions.filter(option => {
        return option.authors.includes(authors);
      })
    );
  }, [authors, autocompleteOptions]);

  useEffect(() => {
    const timerId = setTimeout(getAutocompleteOptions, 750);

    return () => {
      clearTimeout(timerId);
    };
  }, [authors, title]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Autocomplete
          open={titleOpen}
          onOpen={() => setTitleOpen(true)}
          onClose={() => {
            setTitleOpen(false);
            getAutocompleteOptions();
          }}
          onInputChange={(_, value: string) => setTitle(value)}
          getOptionLabel={(option: FormBook) => option.title}
          options={filteredAutocompleteOptions}
          loading={loading}
          freeSolo
          renderInput={(params: any) => (
            <TextField
              {...params}
              value={title}
              label="Title"
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="primary" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Autocomplete
          freeSolo
          open={authorOpen}
          onOpen={() => setAuthorOpen(true)}
          onClose={() => {
            setAuthorOpen(false);
            getAutocompleteOptions();
          }}
          onInputChange={(_, value: string) => setAuthor(value)}
          options={filteredAutocompleteOptions
            .map(el => el.authors)
            .filter((value, index, self) => self.indexOf(value) === index)}
          loading={loading}
          renderInput={(params: any) => (
            <TextField
              {...params}
              value={authors}
              label="Author"
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="primary" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </Grid>
      <Button
        className={classes.submitButton}
        onClick={() => addBook(title, authors)}
        variant="outlined"
        disabled={title.length === 0 || authors.length === 0}
      >
        Submit
      </Button>
    </Grid>
  );
}

export default connect(
  null,
  mapDispatchToProps
)(BookPanel);
