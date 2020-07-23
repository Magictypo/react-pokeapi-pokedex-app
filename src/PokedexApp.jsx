import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import List from './components/List/List';
import Detail from './components/Detail/Detail';

function PokedexApp() {
  return (
    <div className="container py-3">

      <Router>
        <div>
          <Link to="/">
            <h1>Pokedex</h1>
          </Link>

          <Switch>
            <Route exact path="/">
              <List />
            </Route>
            <Route path="/:name" children={<Detail />} />
          </Switch>

        </div>
      </Router>
    </div>
  );
}

export default PokedexApp;
