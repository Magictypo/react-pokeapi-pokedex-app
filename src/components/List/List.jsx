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
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState(null);
  const [filterValue, setFilterValue] = useState([]);
  const {
    isLoading,
    data,
    isNextPage,
    filters,
  } = usePokemons(page, filterType, filterValue);

  function onChangeFilterType(e) {
    const selected = FILTER_TYPES.find((o) => o.type === e.target.value);
    setFilterType(selected);
  }

  function onChangeFilterValue(e) {
    const selected = filters.find((o) => o.name === e.target.value);
    setFilterValue(selected);
  }

  function incrementPage() {
    if (isLoading) return;
    setPage(page + 1);
  }

  const listItems = data.map((o) => (
    <li className="list-group-item text-center" key={o.id}>
      <Link to={`/${o.id}`}>
        <img src={o.images} alt="" />
        {`#${o.id} ${o.name.toUpperCase()}`}
      </Link>
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-6" style={{ margin: '0 auto' }}>
        <div className="card bg-success">

          <SelectType
            value={filterType}
            filterTypes={FILTER_TYPES}
            onChange={onChangeFilterType}
          />

          <SelectFilter
            value={filterValue}
            filterType={filterType}
            filters={filters}
            onChange={onChangeFilterValue}
          />

          <Spinner isLoading={isLoading} />

          <InfiniteScroll
            pageStart={0}
            loadMore={incrementPage}
            hasMore={isNextPage}
            loader={<Spinner isLoading={isLoading} key={0} />}
          >
            <ul className="list-group list-group-flush">{listItems}</ul>
          </InfiniteScroll>

          <MessageEnd hasMore={isNextPage} />

        </div>
      </div>
    </div>
  );
}
