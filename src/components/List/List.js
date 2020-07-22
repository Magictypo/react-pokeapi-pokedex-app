import React from 'react';
import PokeAPI from '../../services/PokeAPI';

class List extends React.Component {

  componentDidMount() {
    const interval = {
      limit: 40,
      offset: 34
    };

    PokeAPI.getPokemonsList(interval)
      .then(function(response) {
        console.log(response);
      });
  }

  render() {
    return (
      <div>
        List Element
      </div>
    );
  }
}

export default List;
