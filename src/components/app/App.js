import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import {MainPage, ComicsPage, Page404, SingleComicsPage} from '../pages';
import AppHeader from '../appHeader/AppHeader';

export default function App() {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicsId" element={<SingleComicsPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
}