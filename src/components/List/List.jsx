import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import usePokemons from './usePokemons';
import Spinner from '../Spinner';
import MessageEnd from './components/MessageEnd';
import SelectType from './components/SelectType';
import SelectTypeId from './components/SelectTypeId';
import ListItem from './components/ListItem';
import ButtonClearFilter from './components/ButtonClearFilter';
import usePokemonsFiltered from './usePokemonsFiltered';

export default function List() {
  // filters state
  const [type, setType] = useState('');
  const [typeId, setTypeId] = useState('');

  // render state
  const stateNormal = usePokemons();
  const stateFiltered = usePokemonsFiltered(type, typeId);

  // conditional render list
  const renderState = type ? stateFiltered : stateNormal;
  const {
    isLoading,
    data,
    isNextPage,
    getMore,
  } = { ...renderState };

  function onChangeFilterType(e) {
    setType(e.target.value);
    setTypeId('');
  }

  function onChangeTypeId(e) {
    setTypeId(e.target.value);
  }

  function onClickClearFilter() {
    setType('');
    setTypeId('');
  }

  const listItems = data.map((o) => (
    <Link to={`/${o.id}`} key={o.id}>
      <ListItem images={o.images} id={o.id} name={o.name} />
    </Link>
  ));

  return (
    <div className="row">
      <div className="col-md-6" style={{ margin: '0 auto' }}>
        <div className="card bg-success">

          <div className="d-flex">
            <SelectType
              value={type}
              onChange={onChangeFilterType}
              disabled={isLoading}
            />
            <SelectTypeId
              value={typeId}
              type={type}
              onChange={onChangeTypeId}
              disabled={isLoading}
            />
            <ButtonClearFilter onClick={onClickClearFilter} disabled={isLoading} />
          </div>

          <Spinner isLoading={isLoading} />

          <InfiniteScroll
            pageStart={0}
            loadMore={getMore}
            hasMore={isNextPage}
            loader={<Spinner isLoading={isLoading} key={0} />}
          >
            <ul className="list-group list-group-flush">{listItems}</ul>
          </InfiniteScroll>

          <MessageEnd
            isLoading={isLoading}
            count={data.length}
            type={type}
            typeId={typeId}
            hasMore={isNextPage}
          />

        </div>
      </div>
    </div>
  );
}
