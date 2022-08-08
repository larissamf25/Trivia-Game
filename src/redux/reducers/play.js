import {
  PLAYSAVE,
  receiveFailure,
  requestAPI,
  receiveSuccess,
} from '../actions/actionstypes';

const INITIAL_STATE = {
  score: 0,
  name: '',
  email: '',
  error: '',
  apiTrivia: [],
  load: false,
  codeBack: 0,
};

const play = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYSAVE:
    return {
      ...state,
      name: action.playerName,
      email: action.playerEmail,
      score: 0,
    };
  case requestAPI:
    return {
      ...state,
      load: true,
    };
  case receiveSuccess:
    return {
      ...state,
      load: false,
      apiTrivia: [...action.resultApi.results],
      codeBack: action.resultApi.response_code,
    };
  case receiveFailure:
    return {
      ...state,
      load: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default play;
