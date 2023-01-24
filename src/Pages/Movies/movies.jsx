import { useState, useEffect, useMemo } from 'react';

import { movies$ } from './data';
import { Card, Filters } from './components';
import * as Styled from './style';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [moviesIsLoading, setMoviesIsLoading] = useState(true);
  useEffect(() => {
    movies$
      .then((data) => setMovies(data))
      .then(() => setMoviesIsLoading(false));
  }, []);

  const handleDeleteMovie = (id) => {
    setMovies((prev) => prev.filter((movie) => movie.id != id));
  };
  {/* Remove filter if there are no remaining movies in that category */}
  useEffect(() => {
    if (movies.filter((movie) => movie.category === selectedFilter).length === 0) {
      setSelectedFilter('');
    }
  }, [movies]);

  const [selectedFilter, setSelectedFilter] = useState(''); 
  const filtersList = useMemo(
    () => {
      if (movies.length === 0) { return []; }
      return [...new Set(movies.map((movie) => movie.category))];
    }, [movies]
  );

  const [offSet, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const handlePrev = () => {
    if(offSet - pageSize < 0) { setOffset(0); }
    else {setOffset(offSet - pageSize)};
  };
  const handleNext = () => {
    setOffset(offSet + pageSize)
  };
  if (moviesIsLoading) { return <div>Loading</div>; }
  const handlePageSizeChange = (size) => {
    setPageSize(parseInt(10, size))
    const overflow = size - (movies.length - offSet);
    if (overflow > 0) {
      if (offSet - overflow <= 0) {setOffset(0)}
      else {setOffset(offSet - overflow)};
    }
  }
  return (
    <Styled.Container>
      <Filters
        filtersList={filtersList}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter} 
      />
      { !!movies.length ? (
        <Styled.Movies>
          <Styled.CardsList>
            { selectedFilter
              ? movies
                .filter((movie) => movie.category === selectedFilter)
                .slice(offSet, offSet + pageSize)
                .map((movie) => (
                  <Card
                    movie={movie}
                    handleDeleteMovie={handleDeleteMovie}
                    key={movie.id}
                  />
                ))
              : movies
                .slice(offSet, offSet + pageSize)
                .map((movie) => (
                  <Card
                    movie={movie}
                    handleDeleteMovie={handleDeleteMovie}
                    key={movie.id}
                  />
                ))
            }
          </Styled.CardsList>
          <Styled.Pagination>
            <select onChange={(e) => handlePageSizeChange(e.target.value)}>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>
            <Styled.PaginationButton 
              $disabled={offSet === 0}
              onClick={() => handlePrev()}
            >
              Prev
            </Styled.PaginationButton>
            <Styled.PaginationButton 
              $disabled={offSet + pageSize >= movies.length}
              onClick={() => handleNext()}
            >
              Next
            </Styled.PaginationButton>
          </Styled.Pagination>
        </Styled.Movies>
      ) : (
        <div>Il n'y a aucun films dans cette liste</div>
      )}
    </Styled.Container>
  )
}
