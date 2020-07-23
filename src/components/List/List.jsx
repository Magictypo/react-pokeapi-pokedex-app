import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { usePokemons } from './hooks';
import Spinner from '../Spinner';
import MessageEnd from './MessageEnd';

export default function List() {
  const {
    isLoading, data, getNextPage, nextPage,
  } = usePokemons();

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
