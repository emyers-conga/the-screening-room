import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import AccessModal from '../AccessModal/AccessModal';
import Container from '../Container/Container';
import SelectedMovie from '../SelectedMovie/SelectedMovie';
import Footer from '../Footer/Footer';
import { getMovies, postFavorite, removeFavorite } from '../../apiCalls/apiCalls';
import { setMovies, isLoading, hasError, addFavorite, setFavorites } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.scss';

class App extends Component {
  componentDidMount = async () => {
    const { setMovies } = this.props;
    try {
      isLoading(true);
      let movieData = await getMovies();
      isLoading(false);
      setMovies(movieData);
    } catch ({ message }) {
      isLoading(false);
      hasError(message);
      }
    }

  updateFavorites = async(movie) => {
    console.log('movie', movie)
    const { user } = this.props;
    if (!movie.favorite) {
      try {
        console.log('inside try add')
        let favoritesData = await postFavorite(movie, user.id)
        console.log(favoritesData)
        addFavorite(favoritesData)
      } catch ({message}){
        hasError(message)
      }
    } else {
      try {
        let favoritesData = await removeFavorite(movie, user.id)
        setFavorites(favoritesData)

      } catch ({ message }) {
        hasError(message)
      }
    }
  };

  render() {
    return (
      <main className='main'>
        <Nav />
          <Route path='/movies/:id' render={({ match }) => {
          console.log(match.params)
          const movieDetails = this.props.movies.find(movie => movie.id === parseInt(match.params.id));
            return (<SelectedMovie movieDetails={movieDetails} />)
          }} />
          <Route path='/(|movies|signup|login)' render={() => <Container updateFavorites={this.updateFavorites}/>} />
          <Route path='/(login|signup)' render={() => <AccessModal />} />
          <Route exact path='/favorites' render={() => <Container />} />
        <Footer />
      </main>
    );
  }
}

const mapStateToProps = ({ movies, hasError, isLoading, user, favorites }) => ({
  movies,
  hasError,
  isLoading,
  user,
  favorites
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ setMovies }, dispatch)
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
