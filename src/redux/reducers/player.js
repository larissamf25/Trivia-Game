import {
  PLAYSAVE,
  receiveFailure,
  requestAPI,
  receiveSuccess,
  sumScore,
  nextQuestion,
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
  correctAnswers: 0,
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
      correctAnswers: state.correctAnswers + 1,
    };
  case nextQuestion:
    return {
      ...state,
      questionNumber: state.questionNumber + 1,
    };
  default:
    return state;
  }
};

export default player;
