import React from 'react';
import List from "./components/List/List";

function PokedexApp() {
  return (
    <div className="container py-3">
      <h1>Pokedex</h1>
      <div className="row">
        <div className="col-2">
          Filter Here
        </div>
        <div className="col-10">
          <List/>
        </div>
      </div>
    </div>
  );
}

export default PokedexApp;
