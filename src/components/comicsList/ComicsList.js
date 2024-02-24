import {useEffect, useState} from 'react';
import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from "../errorMsg/ErrorMessage";
import Spinner from "../spinner/Spinner";

export default function ComicsList() {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);
    const [offset, setOffset] = useState(0);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);


    function onRequest(offset, initial) {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsLoaded);
    }

    function onComicsLoaded(newComics) {
        let ended = false;
        if (newComics.length < 8) {
            ended = true;
        }
        setComics(comics => [...comics, ...newComics]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    function renderComics(arr) {
        const items = arr.map((item, i) => {
            return (
                <li key={i} className="comics__item">
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            );
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    const errorMsg = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const items = renderComics(comics);

    return (
        <div className="comics__list">
            {errorMsg}
            {spinner}
            {items}
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{display: comicsEnded ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>

        </div>
    );
}