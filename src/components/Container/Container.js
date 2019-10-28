import React from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard';
import './Container.scss';

export const Container = ({ movies, updateFavorites }) => {
  const allMovies = movies.map(movie => (
    <MovieCard movie={movie} key={movie.id} updateFavorites={updateFavorites} />
  ));
  return <main className='Container'>{allMovies}</main>;
};

export const mapStateToProps = ({ movies }) => ({
  movies
});

export default connect(mapStateToProps)(Container);
