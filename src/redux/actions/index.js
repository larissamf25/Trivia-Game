import { USER_LOGIN,
  PLAYSAVE,
  receiveFailure,
  requestAPI,
  receiveSuccess } from './actionstypes';

export const actionLogin = (value) => ({ type: USER_LOGIN, value });

export const actionPlaySave = (playerName, playerEmail) => ({
  type: PLAYSAVE,
  playerName,
  playerEmail,
});

export const actionRequest = () => ({ type: requestAPI });

export const actionGetToken = (token) => ({ type: receiveSuccess, token });

export const actionFailure = (error) => ({ type: receiveFailure, error });
