import React, { useState, createContext, useEffect, useReducer } from "react";
import { getMovies } from "./api/movie-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return { movies: action.payload.result};
    default:
      return state;
  }
};

const MoviesContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { movies: []});
  const [authenticated, setAuthenticated] = useState(false);
  const [newPage, setNewPage] = useState(1);


  const handleChange = (event, value) => {
    setNewPage(value);
    console.log(newPage);
  };

  useEffect(() => {
    getMovies(newPage).then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    });
  },[newPage]);

  return (
    <>
    <MoviesContext.Provider
      value={{
        movies: state.movies,
        page : newPage ,
        setAuthenticated,
        handleChange
      }}
    >
      {props.children}
    </MoviesContext.Provider>
    </>
  );
};

export default MoviesContextProvider