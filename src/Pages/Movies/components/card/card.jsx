import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Toggle } from '../toggle';
import { VOTE } from '../toggle/config';

import * as Styled from './style';

export const Card = ({ movie, handleDeleteMovie }) => {
  const { title, category, likes, dislikes, id } = movie;

  {/* Should be handled with a refetchQuery or server response updating the like/dislike count */}
  const [vote, setVote] = useState('NONE');
  const progress = useMemo(() => {
    switch(vote) {
      case VOTE.liked:
        return (likes + 1) / (likes + dislikes + 1) * 100;
      case VOTE.disliked:
        return likes / (likes + dislikes + 1) * 100;
      case VOTE.none:
      default:
        return likes / (likes + dislikes) * 100;
    }
  }, [vote]);

  return (
    <Styled.Card>
      <Styled.Bar $progress={progress} />
      <div>
        <Styled.Title>
          { title }
        </Styled.Title>
        <Styled.Category>
          { category }
        </Styled.Category>
      </div>
      <div>
        <Toggle 
          likes={likes}
          dislikes={dislikes}
          setVote={setVote}
        />
        <Styled.Delete onClick={() => handleDeleteMovie(id)}>
          Supprimer
        </Styled.Delete>
      </div>
      
    </Styled.Card>
  )
}

Card.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  handleDeleteMovie: PropTypes.func.isRequired,
};
