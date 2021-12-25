import React, { useState } from "react";
import Header from "../headerMovieList";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MovieList from "../movieList";

export var sortMoviesBy="popularity.desc";
export var update = false;

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});



function MovieListPageTemplate({ movies, title}) {
  const classes = useStyles();

  let displayedMovies = movies
    
  

  

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList movies={displayedMovies}></MovieList>
      </Grid>
    </Grid>
  );
}




export default MovieListPageTemplate;
