import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMsg/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

export default function CharInfo({charId}) {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    function updateChar() {
        if (!charId) {
            return;
        }

        onCharLoading();

        marvelService
            .getCharacter(charId)
            .then(onCharLoaded)
            .catch(onError);
    }

    function onCharLoaded(char) {
        setChar(char);
        setLoading(false);
    }

    function onCharLoading() {
        setLoading(true);
    }

    function onError() {
        setLoading(false);
        setError(true);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMsg = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMsg}
            {spinner}
            {content}
        </div>
    );
}

function View ({char}) {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  const defaultImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';
  let imgStyle = {'objectFit' : 'cover'};

  if (thumbnail === defaultImage) {
    imgStyle = {'objectFit' : 'contain'};
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length ? null : 'There is no comics with this character'}
        {
          comics.map((item, index) => {
            // eslint-disable-next-line
            if(index > 9) return;
            return (
              <li key={index} className="char__comics-item">
                {item.name}
              </li>
            );
          })
        }
      </ul>
    </>
  );
}

CharInfo.propTypes = {
    charId: PropTypes.number || null
};
