import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import usePokemons from './usePokemons';
import Spinner from '../Spinner';
import MessageEnd from './components/MessageEnd';
import SelectType from './components/SelectType';
import SelectFilter from './components/SelectFilter';
import ListItem from './components/ListItem';
import ButtonClearFilter from './components/ButtonClearFilter';
import usePokemonsFiltered from './usePokemonsFiltered';

export default function List() {
  // infinite scroll trigger
  const [more, setMore] = useState(1);

  // filters state
  const [type, setType] = useState('');
  const [filterURL, setFilterURL] = useState('');

  // render state
  const stateNormal = usePokemons(more);
  const stateFiltered = usePokemonsFiltered(filterURL, more);

  // conditional render list
  const renderState = type ? stateFiltered : stateNormal;
  const { isLoading, data, isNextPage } = { ...renderState };

  function onChangeFilterType(e) {
    setType(e.target.value);
  }

  function onChangeFilterValue(e) {
    setFilterURL(e.target.value);
  }

  function onCLickClearFilter() {
    setType('');
    setFilterURL('');
  }

  function incrementPage() {
    if (isLoading) return;
    setMore(more + 1);
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
            <SelectFilter
              value={filterURL}
              type={type}
              onChange={onChangeFilterValue}
              disabled={isLoading}
            />
            <ButtonClearFilter onClick={onCLickClearFilter} disabled={isLoading} />
          </div>

          <Spinner isLoading={isLoading} />

          <InfiniteScroll
            pageStart={0}
            loadMore={incrementPage}
            hasMore={isNextPage}
            loader={<Spinner isLoading={isLoading} key={0} />}
          >
            <ul className="list-group list-group-flush">{listItems}</ul>
          </InfiniteScroll>

          <MessageEnd
            isLoading={isLoading}
            count={data.length}
            type={type}
            filterURL={filterURL}
            hasMore={isNextPage}
          />

        </div>
      </div>
    </div>
  );
}
