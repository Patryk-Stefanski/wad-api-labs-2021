import { useContext} from 'react';
import MoviesContextProvider, { MoviesContext } from './moviesContext';
import { ActorsContext } from './actorsContext';
import React from 'react';
import ActorPageTemplate  from "./components/templateActorListPage";
import MoviePageTemplate from "./components/templateMovieListPage"
import Pagination from "@material-ui/lab/Pagination"
import { getMovies } from './api/movie-api';

export const PublicPage = () => {
    return <h2>Public page</h2>
 }
 
 export const Movies = () => {
    const context = useContext(MoviesContext);
    const [page, setPage] = React.useState(context.movies.page);
    const handleChange = (event, value) => {
        setPage(value);
        getMovies(page)
      };

    return <>
        <MoviePageTemplate
        title = "Movie Data"
        movies= {context.movies.results}
        >
        </MoviePageTemplate>
        <Pagination count={context.movies.total_pages} style={{position: 'absolute' , left:'50%',transform:'translate(-50%)'} } page={page} onChange={handleChange}/>
    </>
}

export const Actors = () => {
    const context = useContext(ActorsContext);
    return <>
        <ActorPageTemplate
        title="Actors Data" 
        actors={context.actors.results}
        >
        </ActorPageTemplate>
        <Pagination count={context.actors.total_pages} style={{position: 'absolute' , left:'50%',transform:'translate(-50%)'} } page={context.actors.page}/>
    </>
}

 export const Profile = () => {
    return <h2>My Profile </h2>
}
 export const HomePage = () => {
     return  <h2>Home page</h2>
 }
 