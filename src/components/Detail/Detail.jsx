import React from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from './usePokemon';
import Field from './Field';
import FieldBar from './FieldBar';
import Spinner from '../Spinner';
import BackButton from './BackButton';
import PokemonName from './PokemonName';

const centerizeStyles = { margin: '0 auto' };

function Detail() {
  const { id } = useParams();
  const { isLoading, data } = usePokemon(id);

  return (
    <div className="row">
      <div className="col-sm-10 col-md-6" style={centerizeStyles}>
        <div className="card bg-light">
          <div className="card-body">

            <Spinner isLoading={isLoading} />

            <div className="d-flex justify-content-between">
              <BackButton />
              <PokemonName order={data.order.toString()} name={data.name} />
              <img src={`/assets/sprites/pokemon/${data.id}.png`} alt="" />
            </div>

            <div className="card text-white bg-info mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <Field value={`${data.height}"`} label="Height" />
                    <Field value={`${data.weight} lbs`} label="Weight" />
                  </div>
                  <div className="col-6">
                    <Field value={data.types} label="Types" />
                    <Field value={data.abilities} label="Abilities" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card text-white bg-dark mb-3">
              <h5 className="card-header">Stat</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <FieldBar value={data.stats.hp} label="HP" />
                    <FieldBar value={data.stats.attack} label="Attack" />
                    <FieldBar value={data.stats.defense} label="Defence" />
                  </div>
                  <div className="col-6">
                    <FieldBar value={data.stats.specialAttack} label="Special Attack" />
                    <FieldBar value={data.stats.specialDefense} label="Special Defence" />
                    <FieldBar value={data.stats.speed} label="Speed" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
