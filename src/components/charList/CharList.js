import {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMsg/ErrorMessage';
import Spinner from '../spinner/Spinner';

export default function CharList(props) {
    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const {loading, error, getAllCharacters} = useMarvelService();

    function onRequest(offset, initial) {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset).then(onCharsLoaded)
    }

    const onCharsLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setChars(charList => [...chars, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
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
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const items = renderItems(chars);

  return (
      <div className="char__list">
        {errorMsg}
          {spinner}
          {items}
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