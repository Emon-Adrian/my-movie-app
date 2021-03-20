import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import logo from './logo.svg';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './AddFavourites';
import RemoveFavourite from './components/RemoveFavourite';

//const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=b00a0a7e'
const App = () => {
  const [movies, setMovies] = useState([])
  const [favourites, setFavourites] = useState([])
  const [searchValue, setSearchValue] = useState('')

  const getMovieRequest = async () =>{
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=b00a0a7e`

    const response = await fetch(url);
    const responseJson = await response.json();
    
    if (responseJson.Search){
      setMovies(responseJson.Search);
    }
    
  };
useEffect (()=>{
  getMovieRequest(searchValue);
}, [searchValue]);

useEffect(() =>{
  const movieFavourites = JSON.parse(
    localStorage.getItem('react-movie-app-favourite')
  );
  setFavourites(movieFavourites);
},[]);

const saveToLocalStorage = (item) => {
  localStorage.setItem('react-movie-app-favourite', JSON.stringify(item))
};
  
const addFavouriteMovie = (movie) => {
  const newFavouriteList = [...favourites, movie];
  setFavourites(newFavouriteList)
  saveToLocalStorage(newFavouriteList)
};
const removefavouriteMovie = (movie) => {
  const newFavouriteList = favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
  );
  setFavourites(newFavouriteList)
  saveToLocalStorage(newFavouriteList)
}

  return (
  
    <div className='container-fluid' className='movie-app' >
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
           <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} FavouriteComponent={AddFavourites}/>
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Emon Adrian Favourites'/>
      </div>
      <div className='row'>
           <MovieList movies={favourites} handleFavouritesClick={removefavouriteMovie} FavouriteComponent={RemoveFavourite}/>
      </div>
    </div>
    
  );
}

export default App;
