import {useState} from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ComicsList from '../comicsList/ComicsList';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import decoration from '../../resources/img/vision.png';

export default function App() {
    const [selectedChar, setSelectedChar] = useState(null);

    function onCharSelected(id) {
        setSelectedChar(id);
    }

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <ComicsList/>
                {/*<RandomChar/>*/}
                {/*<div className="char__content">*/}
                {/*    <CharList onCharSelected={onCharSelected}/>*/}
                {/*    <ErrorBoundary>*/}
                {/*        <CharInfo charId={selectedChar}/>*/}
                {/*    </ErrorBoundary>*/}
                {/*</div>*/}
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    );
}