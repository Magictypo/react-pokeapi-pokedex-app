import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { usePokemons } from './usePokemons';
import Spinner from '../Spinner';
import MessageEnd from './MessageEnd';
import SelectType from './SelectType';
import SelectFilter from './SelectFilter';
import ListItem from './ListItem';

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
      <ListItem images={o.images} id={o.id} name={o.name} />
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
              isLoading={isLoading}
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
