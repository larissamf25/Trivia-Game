import {
  PLAYSAVE,
  receiveFailure,
  requestAPI,
  receiveSuccess,
} from './actionstypes';

export const actionPlaySave = (playerName, playerEmail) => ({
  type: PLAYSAVE,
  playerName,
  playerEmail,
});

export const actionRequest = () => ({ type: requestAPI });

export const actionReciveTrivia = (resultApi) => ({
  type: receiveSuccess,
  resultApi,
});

export const actionFailure = (error) => ({ type: receiveFailure, error });
