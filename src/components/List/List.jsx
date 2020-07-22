import React from 'react';
import { getPokemons } from '../../services/PokeAPI';

class List extends React.Component {
  async componentDidMount() {
    const res = await getPokemons(10, 20);
    console.log(res.data);
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
