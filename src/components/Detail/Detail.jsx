import React from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from './hooks';
import Field from './Field';
import FieldBar from './FieldBar';
import Spinner from '../Spinner';

function Detail() {
  const { name } = useParams();
  const [isLoading, result] = usePokemon(name);

  return (
    <div className="row">
      <div className="col-sm-10 col-md-6" style={{ margin: '0 auto' }}>
        <div className="card bg-light">
          <div className="card-body">

            <Spinner isLoading={isLoading} />

            <h2 className="card-title">
              {`#${result.order} ${result.name.toUpperCase()}`}
              <img src={result.image} alt="" />
            </h2>

            <div className="card text-white bg-info mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <Field value={`${result.height}"`} label="Height" />
                    <Field value={`${result.weight} lbs`} label="Weight" />
                  </div>
                  <div className="col-6">
                    <Field value={result.types} label="Types" />
                    <Field value={result.abilities} label="Abilities" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card text-white bg-dark mb-3">
              <h5 className="card-header">Stat</h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-6">
                    <FieldBar value={result.stats.hp} label="HP" />
                    <FieldBar value={result.stats.attack} label="Attack" />
                    <FieldBar value={result.stats.defense} label="Defence" />
                  </div>
                  <div className="col-6">
                    <FieldBar value={result.stats.specialAttack} label="Special Attack" />
                    <FieldBar value={result.stats.specialDefense} label="Special Defence" />
                    <FieldBar value={result.stats.speed} label="Speed" />
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
