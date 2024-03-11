import {useParams, Link} from 'react-router-dom';
import {useEffect, useState} from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMsg/ErrorMessage';

import './singleComicsPage.scss';


export default function SingleComicsPage() {
    const {comicsId} = useParams();
    const [comics, setComics] = useState(null);
    const {loading, error, getOneComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics();
    }, [comicsId]);

    function updateComics() {
        clearError();
        if (!comicsId) {
            return;
        }
        getOneComics(comicsId)
            .then(onComicsLoaded)
    }

    function onComicsLoaded(comics) {
        setComics(comics);
    }

    const errorMsg = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !comics) ? <View comics={comics}/> : null;

    return (
        <>
            {errorMsg}
            {spinner}
            {content}
        </>
    );
}

const View = ({comics}) => {
    const {title, description, price, language, thumbnail, pageCount} = comics;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to={'/comics'} className="single-comic__back">Back to all</Link>
        </div>
    );
}

