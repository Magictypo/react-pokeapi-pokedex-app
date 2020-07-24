import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import usePokemons from './usePokemons';
import Spinner from '../Spinner';
import MessageEnd from './MessageEnd';
import SelectType from './SelectType';
import SelectFilter from './SelectFilter';
import ListItem from './ListItem';
import ButtonClearFilter from './ButtonClearFilter';

export default function List() {
  const [initCount, setInitCount] = useState(1);
  const [page, setPage] = useState(1);

  // filters
  const [type, setType] = useState('');
  const [filterURL, setFilterURL] = useState('');

  const {
    isLoading,
    data,
    isNextPage,
  } = usePokemons(initCount, page, filterURL);

  function onChangeFilterType(e) {
    setType(e.target.value);
  }

  function onChangeFilterValue(e) {
    setFilterURL(e.target.value);
  }

  function onCLickClearFilter() {
    // trigger effect
    setInitCount(initCount + 1);

    // clear form
    setType('');
    setFilterURL('');
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

          <MessageEnd type={type} filterURL={filterURL} hasMore={isNextPage} />

        </div>
      </div>
    </div>
  );
}
