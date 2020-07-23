import React from 'react';
import { useParams } from 'react-router-dom';
import { usePokemon } from './hooks';
import Field from './Field';
import FieldBar from './FieldBar';
import Spinner from '../Spinner';

function Detail() {
  const { name } = useParams();
  const { isLoading, data } = usePokemon(name);

  return (
    <div className="row">
      <div className="col-sm-10 col-md-6" style={{ margin: '0 auto' }}>
        <div className="card bg-light">
          <div className="card-body">

            <Spinner isLoading={isLoading} />

            <h2 className="card-title">
              {`#${data.order} ${data.name.toUpperCase()}`}
              <img src={data.image} alt="" />
            </h2>

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
