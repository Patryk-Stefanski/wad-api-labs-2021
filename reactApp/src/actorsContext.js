import React, { useState, createContext, useEffect, useReducer } from "react";
import { getActors } from "./api/movie-api";

export const ActorsContext = createContext(null);

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return { actors: action.payload.result};
    default:
      return state;
  }
};

const ActorsContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, { actors: []});
  const [authenticated, setAuthenticated] = useState(false);
  const [newPage, setNewPage] = useState(1);


  const handleChange = (event, value) => {
    setNewPage(value);
    console.log(newPage);
  };

  useEffect(() => {
    getActors(newPage).then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    });
  },[newPage]);

  return (
    <ActorsContext.Provider
      value={{
        actors: state.actors,
        page : newPage,
        setAuthenticated,
        handleChange
      }}
    >
      {props.children}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider