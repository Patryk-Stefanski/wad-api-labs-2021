# Assignment 2 - Web API.
​
Name: Patryk Stefanski
​
## Features.
 + Feature 1 - REACT App communicates with movie-api to display movies , movie details , actors and actor details from TMDB.
 + Feature 2 - New model in movie api for actors.
 + Feature 3 - Implemented pagination.
 + Feature 4 - Created and implemented get fucntions for movie/actor details and images.
 + Feature 5 - Created get and post function for movie reviews (not implemented).
 + Featire 6 - Integrated mongo for storage of users and seed data (movies , actors , genres).
​
## Installation Requirements
​
​
Clone repo
​
```bat
git clone https://github.com/Patryk-Stefanski/wad-api-labs-2021.git
```
​
Download  MongoDB community server  - (https://www.mongodb.com/try/download/community)
​
Install MongoDB. 
 ``` 
 mkdir db
 mongod -dbpath db
 ```
​
Install mongoose.
 ```
 npm install -save mongoose
```
​
Connect App to mongoDb - In root folder of movies-api open .env file and add the following.
```
MONGO_DB=mongodb://YOUR_MONGODB_SERVER
```
​
Seed DB with data - in .env file add the following.
```
SEED_DB=True
```
​
Setup MongoDB cloud  - Create a free tier cluster on [Mongo]( https://cloud.mongodb.com/)  , from the connection option on the cluster copy the connection string and add the following to your .env (express app).
```
mongoDB=mongodb+srv://YOUR_MONGODB_CONNECTION_STRING
```
​
Install dependencies.
```bat
npm i bootstrap react-bootstrap
npm install @material-ui/lab
npm i react-query
npm install @material-ui/lab
npm install @material-ui/icons
npm install @material-ui/core
```





## API Configuration
Obtaining the Mongo values has been expmained abvove duriung the instalation/preperation process .To get your TMDB key login to your account on [TMDB](https://www.themoviedb.org/login) and then go to [settings/api](https://www.themoviedb.org/settings/api) and copy your key.
​
Movie-API
```bat
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://YOUR_MONGODB_SERVER
SEED_DB=False
mongoDB=mongodb+srv://YOUR_MONGODB_CONNECTION_STRING
SECRET=ilikecake
TMDB_KEY=YOUR_TMDB_KEY
```
​
## API Design
Give an overview of your web API design, perhaps similar to the following: 
​
|  |  GET | POST | PUT | DELETE
| -- | -- | -- | -- | -- 
| /api/movies/?page={pageNum} |Gets a list of movies | N/A | N/A |
| /api/movies/{movieid} | Get a Movie | N/A | N/A | N/A
| /api/movies/{movieid}/reviews | Get all reviews for movie | Create a new review for Movie | N/A | N/A  
| /api/movies/{movieid}/details | Get all details for movie | N/A | N/A | N/A 
| /api/movies/{movieid}/images | Get all images for movie | N/A | N/A | N/A 
| /api/actors/?page={pageNum} |Gets a list of actors | N/A | N/A |
| /api/actors/{actorid} | Get a actor | N/A | N/A | N/A
| /api/actors/{actorid}/details | Get all details for actor | N/A | N/A | N/A  
| /api/actors/{actorid}/images | Get all images for actor | N/A | N/A | N/A  
| /api/users | N/A | Login User | N/A | N/A  
| /api/users | N/A | Login User | N/A | N/A  
| /api/users?action=register | N/A | Register new user | N/A | N/A
​
## Security and Authentication
The home , public , signup and logn page are public so evryone has access to them this is because evryone hsould be allowed to sugnup and login and the public page and home page are empty so there is no security issiues there.If I had more time to implement the public and home page I would make these private routes.All other pages are set to a private route as they should only be visible for registered user of the app . The routes are protected by using a JWT token , each user is given a token after sucesfully logging in , if a user doesnt have a valid token then hes brough back to the login page.

```
Route         path="/public"      -Pblic page (empty)
Route         path="/"            -Home page (empty)
Route         path="/login"       -Login page
Route         path="/signup"      -Singup page
PrivateRoute  path="/movies"      -Popular movies page
PrivateRoute  path="/movies/:id"  -Movie details page
PrivateRoute  path="/actors"      -Actors Page
PrivateRoute  path="/actors/:id"  -Actor details page
PrivateRoute  path="/profile"     -User profile page (empty)
```

​
## Integrating with React App
​
All the API calls work as follows:
​
1. The fucntion getMovies(pageNum) is called from a file and specifies what page it wants to recieve.In this case the getMovies function is called in the moviescontext file and has argument of newPage which sets our pageNum.
~~~Javascript
useEffect(() => {
    getMovies(newPage).then(result => {
      console.log(result);
      dispatch({ type: "load", payload: {result}});
    });
  },[newPage]);
​
~~~
​
2. The fucntion getMovies(pageNum) is executed in  `reactapp/src/api/movie-api.js`.The function then searhes for the route `/api/movies/` in  the `movies-api/api/movies/index.js` file through a proxy setup in `package.json`.
~~~Javascript
export const getMovies = (args) => {
  const page = args;
    return fetch(
       `/api/movies/?page=${page}` ,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };
​
~~~
​
3. Once the route from step 2 is found the `?page={page}` is passed into the function mathcing the route as a request query and is saved as a variable.
~~~Javascript
router.get('/', asyncHandler(async (req, res) => {
    let   {page}  = req.query; // destructure page and limit and set default values

    const movies = await getMovies(page);
    res.status(200).json(movies);
}));
​
~~~
​
4. The await getMovies(page) function makes a call to `tmdb-api.js` where the results are obtained from.The request query which we saved as a variable  in step 3 is used to fetch the appropriate page of the results.
~~~Javascript
export const getMovies = (args) => {
    const  page  = args ;
    return fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${page}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(response.json().message);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
~~~
​

