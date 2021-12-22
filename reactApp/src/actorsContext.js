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

  useEffect(() => {
    getActors().then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    });
  },[]);

  return (
    <ActorsContext.Provider
      value={{
        actors: state.actors,
        setAuthenticated
      }}
    >
      {props.children}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider