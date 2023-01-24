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
  const handlePageSizeChange = (size) => {
    setPageSize(parseInt(10, size))
    const overflow = size - (movies.length - offSet);
    if (overflow > 0) {
      if (offSet - overflow <= 0) {setOffset(0)}
      else {setOffset(offSet - overflow)};
    }
  }

  if (moviesIsLoading) { return <div>Loading</div>; }
  
  return (
    <Styled.Container>
      <Filters
        filtersList={filtersList}
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter} 
      />
      { !movies.length 
        ? <div>Il n'y a aucun films dans cette liste</div> 
        : (
        <Styled.Movies>
          {/* This hack allows me to display required tabs with CSS, and therefore to persist state change for the vote without redux, cookies or refetching the updated data 
            I would then use a slice method in l69 and l78 that will destroy and mount components on page change. I am however only used to refetchQuery and server
            side pagination.
            Another solution would be to directly update the state of the movies array to persist state when cards are destroyed / mounted again
          */}
          <Styled.CardsList $min={offSet} $max={offSet+pageSize}>
            { selectedFilter
              ? movies
                .filter((movie) => movie.category === selectedFilter)
                .map((movie) => (
                  <Card
                    movie={movie}
                    handleDeleteMovie={handleDeleteMovie}
                    key={movie.id}
                  />
                ))
              : movies
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
      )}
    </Styled.Container>
  )
}
