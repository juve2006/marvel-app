import { Component } from 'react';

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMsg/ErrorMessage';
import Spinner from '../spinner/Spinner';

export default class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService.getAllCharacters()
        .then(this.onCharsLoaded)
        .catch(this.onError)
  }


  onCharsLoaded = (chars) => {
    this.setState({
      chars,
      loading: false
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  renderItems(arr) {

    const items =  arr.map((item) => {
      let imgStyle = {'objectFit' : 'cover'};
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
      }


      return (
          <li className="char__item" key={item.id}>
              <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
              <div className="char__name">{item.name}</div>
          </li>
      )
    });
    console.log(items)
    return (
        <ul className="char__grid">
          {items}
        </ul>
    )
  }

  render() {
    const {chars, loading, error} = this.state;


    const errorMsg = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const items = this.renderItems(chars);
    console.log(items)
    const content = !(loading || error) ? items : null;


      return (
          <div className="char__list">
            {errorMsg}
            {spinner}
            {content}
            <button className="button button__main button__long">
              <div className="inner">load more</div>
            </button>
          </div>
      )
  }
}