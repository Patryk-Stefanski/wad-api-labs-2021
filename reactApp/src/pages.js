import { useContext } from 'react';
import { MoviesContext } from './moviesContext';
import { ActorsContext } from './actorsContext';
import React from 'react';
import ActorPageTemplate from "./components/templateActorListPage";
import MoviePageTemplate from "./components/templateMovieListPage"
import Pagination from "@material-ui/lab/Pagination"
import PageTemplate from "./components/templateMoviePage"
import MovieDetails from "./components/movieDetails"
import { getActor, getMovie } from './api/movie-api';
import { useState } from 'react';
import { useQuery } from "react-query";
import Spinner from "./components/spinner"
import { queryClient } from '.';
import ActorDetails from "./components/actorDetails"
import ActorTemplatePage from "./components/templateActorPage"



export const PublicPage = () => {
    return <h2>Public page</h2>
}

export const Movies = () => {
    const context = useContext(MoviesContext);

    return <>
        <MoviePageTemplate
            title="Movie Data"
            movies={context.movies.results}
        >
        </MoviePageTemplate>
        <Pagination count={context.movies.total_pages} style={{ position: 'absolute', left: '50%', transform: 'translate(-50%)' }} page={context.page} onChange={context.handleChange} />
    </>
}

export const MovieDetailsPage =  (props) => {
    const { id } = props.match.params
    console.log( `${id}` )

    const { data : movie, error, isLoading, isError} = useQuery(
        ["movie", { id: id }],
        getMovie
    );
    
    
    console.log(movie);
      
    return (
        <>
              {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
        </>
      );


}

export const Actors = () => {
    const context = useContext(ActorsContext);
    return <>
        <ActorPageTemplate
            title="Actors Data"
            actors={context.actors.results}
        >
        </ActorPageTemplate>
        <Pagination count={context.actors.total_pages} style={{ position: 'absolute', left: '50%', transform: 'translate(-50%)' }} page={context.page} onChange={context.handleChange} />
    </>
}


export const ActorsDetailsPage =  (props) => {
    const { id } = props.match.params
    console.log( `${id}` )
    


    const { data : actor, error, isLoading, isError} = useQuery(
        ["actor", { id: id }],
        getActor
    );
    
    console.log(actor);
   
    return (
        <>
        {actor ? (
            <>
              <ActorTemplatePage actor={actor}>
                <ActorDetails actor={actor} />
              </ActorTemplatePage>
            </>
          ) : (
            <p>Waiting for actor details</p>
          )}
        </>
      );
}

export const Profile = () => {
    return <h2>My Profile </h2>
}
export const HomePage = () => {
    return <h2>Home page</h2>
}
