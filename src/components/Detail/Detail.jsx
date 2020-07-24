import React from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from './usePokemon';
import Field from './components/Field';
import FieldBar from './components/FieldBar';
import Spinner from '../Spinner';
import BackButton from './components/BackButton';
import PokemonName from './components/PokemonName';

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
                    <Field value={`${data.height.toString()}"`} label="Height" />
                    <Field value={`${data.weight.toString()} lbs`} label="Weight" />
                  </div>
                  <div className="col-6">
                    <Field value={data.types.toString()} label="Types" />
                    <Field value={data.abilities.toString()} label="Abilities" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card text-white bg-dark mb-3">
              <h5 className="card-header">Stat</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <FieldBar value={data.stats.hp.toString()} label="HP" />
                    <FieldBar value={data.stats.attack.toString()} label="Attack" />
                    <FieldBar value={data.stats.defense.toString()} label="Defence" />
                  </div>
                  <div className="col-6">
                    <FieldBar value={data.stats.specialAttack.toString()} label="Special Attack" />
                    <FieldBar value={data.stats.specialDefense.toString()} label="Special Defence" />
                    <FieldBar value={data.stats.speed.toString()} label="Speed" />
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
