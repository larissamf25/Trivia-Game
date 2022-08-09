import {
  PLAYSAVE,
  receiveFailure,
  requestAPI,
  receiveSuccess,
  sumScore,
  nextQuestion,
  resetStats,
} from '../actions/actionstypes';

const INITIAL_STATE = {
  score: 0,
  name: '',
  email: '',
  error: '',
  apiTrivia: [],
  load: false,
  codeBack: 0,
  questionNumber: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
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
  case sumScore:
    return {
      ...state,
      score: state.score + action.value,
      assertions: state.assertions + 1,
    };
  case nextQuestion:
    return {
      ...state,
      questionNumber: state.questionNumber + 1,
    };
  case resetStats:
    return {
      ...state,
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};

export default player;
