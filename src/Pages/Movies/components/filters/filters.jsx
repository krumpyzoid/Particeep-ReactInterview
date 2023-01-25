import PropTypes from 'prop-types';
import * as Styled from './style';

export const Filters = ({ filtersList, selectedFilter, handleSelectFilter }) => {
  return (
    <Styled.Filters>
      <Styled.Title>
        Filtrer
      </Styled.Title>
      { filtersList.map((filter) => (
        <Styled.Filter 
          onClick={() => handleSelectFilter(filter)} 
          $selected={selectedFilter === filter}
          key={filter}
        >
          { filter }
        </Styled.Filter>
      ))}
      { selectedFilter && (
          <Styled.Remove onClick={() => handleSelectFilter('')} >
            Retirer le filtre
          </Styled.Remove>
        )}
    </Styled.Filters>
  )
};

Filters.propTypes = {
  filtersList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFilter: PropTypes.string.isRequired,
  handleSelectFilter: PropTypes.func.isRequired,
}