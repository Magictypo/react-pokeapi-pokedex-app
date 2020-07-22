import React from 'react';
import { getPokemonById } from '../../services/PokeAPI';

class Detail extends React.Component {
  async componentDidMount() {
    const res = await getPokemonById(1);
    console.log(res.data);
  }

  render() {
    return (
      <div>
        Detail Element
      </div>
    );
  }
}

export default Detail;
