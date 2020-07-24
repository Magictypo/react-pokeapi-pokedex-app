import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { usePokemons } from './usePokemons';
import Spinner from '../Spinner';
import MessageEnd from './MessageEnd';
import SelectType from './SelectType';
import SelectFilter from './SelectFilter';

export default function List() {
  const [initCount, setInitCount] = useState(1);
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const {
    isLoading,
    data,
    isNextPage,
    filters,
  } = usePokemons(initCount, page, filterType, filterValue);

  function onChangeFilterType(e) {
    setFilterType(e.target.value);
  }

  function onChangeFilterValue(e) {
    setFilterValue(e.target.value);
  }

  function clearFilter() {
    // trigger effect
    setInitCount(initCount + 1);

    // clear form
    setFilterType('');
    setFilterValue('');
  }

  function incrementPage() {
    if (isLoading) return;
    setPage(page + 1);
  }

  const listItems = data.map((o) => (
    <Link to={`/${o.id}`} key={o.id}>
      <div
        style={{ margin: '8px' }}
        className="list-group-item d-flex justify-content-between"
      >
        <h1
          style={{ lineHeight: '96px' }}
          className="mb-0"
        >
          {`#${o.id}`}
        </h1>
        <img src={o.images} alt="" />
        <h1 style={{ lineHeight: '96px' }}>{`${o.name.toUpperCase()}`}</h1>

      </div>
    </Link>
  ));

  return (
    <div className="row">
      <div className="col-md-6" style={{ margin: '0 auto' }}>
        <div className="card bg-success">

          <div className="d-flex">
            <SelectType
              value={filterType}
              onChange={onChangeFilterType}
            />
            <SelectFilter
              value={filterValue}
              filters={filters}
              filterType={filterType}
              onChange={onChangeFilterValue}
            />
            <button
              style={{ margin: '8px' }}
              className="btn-warning form-control"
              type="button"
              onClick={clearFilter}
            >
              Clear Filter
            </button>
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

          <MessageEnd filterType={filterType} filterValue={filterValue} hasMore={isNextPage} />

        </div>
      </div>
    </div>
  );
}
