export const login = (username, password) => {
    return fetch('/api/users', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const signup = (username, password) => {
    return fetch('/api/users?action=register', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => res.json())
};

export const getMovies = (args) => {
  const page = args;
    return fetch(
       `/api/movies/?page=${page}` ,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
  };


export const getMovie = (args) => {
  const id = args ;
    return fetch(
       `/api/movies/${id}`,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
};


export const getMovieImages = (id) => {
  return fetch(
     `/api/movies/${id}/images`,{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};


export const getMovieReviews = (id) => {
  return fetch(
     `/api/movies/${id}/reviews`,{headers: {
       'Authorization': window.localStorage.getItem('token')
    }
  }
  ).then(res => res.json());
};

  
export const getActors = (args) => {
   const page = args ;
    return fetch(
       `/api/actors/?page=${page}`,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then(res => res.json());
}; 


export const getActor = (id) => {
     return fetch(
        `/api/actors/:${id}`,{headers: {
          'Authorization': window.localStorage.getItem('token')
       }
     }
     ).then(res => res.json());
}; 


export const getActorImages = (id) => {
     return fetch(
        `/api/actors/:${id}/images`,{headers: {
          'Authorization': window.localStorage.getItem('token')
       }
     }
     ).then(res => res.json());
}; 


  
