import { useState } from 'react';
import PropTypes from 'prop-types';

import { VOTE } from './config';
import * as Styled from './style';

export const Toggle = ({ likes, dislikes, setVote }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleClickLike = () => {
    setDisliked(false);
    setLiked(!liked);
    if (liked) { setVote(VOTE.none); }
    else { setVote(VOTE.liked); }
  }

  const handleClickDislike = () => {
    setLiked(false);
    setDisliked(!disliked);
    if (disliked) { setVote(VOTE.none);} 
    else { setVote(VOTE.disliked); }
  }

  return (
    <Styled.Toggle>
      <Styled.Vote 
        onClick={() => handleClickLike()}
        $active={liked}
      >
        {liked ? likes + 1 : likes} Like
      </Styled.Vote>
      <Styled.Vote 
        onClick={() => handleClickDislike()}
        $active={disliked}
      >
        {disliked ? dislikes + 1 : dislikes} Dislike
      </Styled.Vote>
    </Styled.Toggle>
  )
};

Toggle.propTypes = {
  likes: PropTypes.number.isRequired,
  dislikes: PropTypes.number.isRequired,
  setVote: PropTypes.func.isRequired,
}