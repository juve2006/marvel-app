import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {MainPage, ComicsPage} from '../pages';
import AppHeader from '../appHeader/AppHeader';

export default function App() {
  return (
      <Router>
        <div className="app">
          <AppHeader/>
          <main>
            <Switch>
              <Route exact path="/">
                <MainPage/>
              </Route>
              <Route exact path="/comics">
                <ComicsPage/>
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
  );
}