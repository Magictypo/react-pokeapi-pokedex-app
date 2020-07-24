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
          <nav className="navbar fixed-top navbar-light bg-dark mb-5">
            <Link to="/">
              <h4 className="mb-0">Pokedex</h4>
            </Link>
          </nav>

          <div style={{ marginTop: '60px' }}>
            <Switch>
              <Route exact path="/">
                <List />
              </Route>
              <Route path="/:id">
                <Detail />
              </Route>
            </Switch>
          </div>

        </div>
      </Router>
    </div>
  );
}

export default PokedexApp;
