import {
  PLAYSAVE,
} from '../actions/actionstypes';

const INITIAL_STATE = {
  score: 0,
  name: '',
  email: '',
};

const play = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYSAVE:
    return {
      name: action.playerName,
      email: action.playerEmail,
      score: 0,
    };
  default:
    return state;
  }
};

export default play;
