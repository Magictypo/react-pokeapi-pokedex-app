import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { usePokemons } from './usePokemons';
import Spinner from '../Spinner';
import MessageEnd from './MessageEnd';
import SelectType from './SelectType';
import SelectFilter from './SelectFilter';

const FILTER_TYPES = [
  { type: 'type', label: 'Type' },
  { type: 'ability', label: 'Ability' },
];

export default function List() {
  const [filterType, setFilterType] = useState(null);
  const [filterValue, setFilterValue] = useState([]);
  const {
    isLoading,
    data,
    getNextPage,
    nextPage,
    filters,
  } = usePokemons(filterType, filterValue);

  function onChangeFilterType(e) {
    const selected = FILTER_TYPES.find((o) => o.type === e.target.value);
    setFilterType(selected);
  }

  function onChangeFilterValue(e) {
    const selected = filters.find((o) => o.name === e.target.value);
    setFilterValue(selected);
  }

  const listItems = data.map((o) => (
    <li className="list-group-item text-center" key={o.name}>
      <Link to={`/${o.name}`}>
        <img src={o.images} alt="" />
        {`#${o.id} `}
        {o.name.toUpperCase()}
      </Link>
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-6" style={{ margin: '0 auto' }}>
        <div className="card bg-success">

          <SelectType filterTypes={FILTER_TYPES} onChange={onChangeFilterType} />
          <SelectFilter filterType={filterType} filters={filters} onChange={onChangeFilterValue} />

          <Spinner isLoading={isLoading} />

          <InfiniteScroll
            pageStart={0}
            loadMore={getNextPage}
            hasMore={!!nextPage}
            loader={<Spinner isLoading={isLoading} key={0} />}
          >
            <ul className="list-group list-group-flush">{listItems}</ul>
          </InfiniteScroll>
          <MessageEnd hasMore={!!nextPage} />
        </div>
      </div>
    </div>
  );
}
