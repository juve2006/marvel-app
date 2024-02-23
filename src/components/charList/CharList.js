import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMsg/ErrorMessage';
import Spinner from '../spinner/Spinner';

export default function CharList(props) {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  useEffect(() => {
    onRequest();
  }, []);

  const marvelService = new MarvelService();

  function onRequest(offset) {
    onCharsLoading();
    marvelService.getAllCharacters(offset)
        .then(onCharsLoaded)
        .catch(onError)
  }

  function onCharsLoading() {
    setNewItemLoading(true);
  }

  function onCharsLoaded(newChars) {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    setChars(chars => [...chars, ...newChars]);
    setLoading(false);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  }

  function onError() {
    setLoading(false);
    setError(true);
  }

  const itemRefs = useRef([]);

  function focusOnItem(id) {
    itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemRefs.current[id].classList.add('char__item_selected');
    itemRefs.current[id].focus();
  }

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = {'objectFit': 'cover'};
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit': 'unset'};
      }

      return (
          <li className="char__item"
              ref={elem => itemRefs.current[i] = elem}
              key={item.id}
              onClick={() => {
                props.onCharSelected(item.id)
                focusOnItem(i)
              }}>
            <img src={item.thumbnail}
                 alt={item.name}
                 style={imgStyle}
            />
            <div className="char__name">{item.name}</div>
          </li>
      );
    });

    return (
        <ul className="char__grid">
          {items}
        </ul>
    );
  }

  const errorMsg = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const items = renderItems(chars);
  const content = !(loading || error) ? items : null;

  return (
      <div className="char__list">
        {errorMsg}
        {spinner}
        {content}
        <button
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{display: charEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
  );
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
};