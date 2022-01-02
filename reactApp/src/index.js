import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch, Link } from "react-router-dom";
import { PublicPage, Movies, Actors, Profile, HomePage  , MovieDetailsPage ,ActorsDetailsPage} from "./pages";
import LoginPage from "./loginPage";
import AuthProvider from "./authContext";
import PrivateRoute from "./privateRoute";
import AuthHeader from "./authHeader";
import SignUpPage from "./signUpPage";
import MovieProvider from "./moviesContext";
import ActorProvider from "./actorsContext";
import { QueryClientProvider, QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <AuthHeader />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/public">Public</Link>
          </li>
          <li>
            <Link to="/movies">Movies</Link>
          </li>
          <li>
            <Link to="/actors">Actors</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
        
        
        <Switch>
        <MovieProvider>
          <Route path="/public" component={PublicPage} />
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute exact path="/movies" component={Movies} />
          <PrivateRoute exact path="/movies/:id" component={MovieDetailsPage} />
          <ActorProvider>
        <PrivateRoute exact path="/actors" component={Actors} />
        <PrivateRoute exact path="/actors/:id" component={ActorsDetailsPage} />
        </ActorProvider>
          <PrivateRoute path="/profile" component={Profile} />
          <Redirect from="*" to="/" />
        </MovieProvider>
        </Switch>
             </AuthProvider>
    </BrowserRouter>
    </QueryClientProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));