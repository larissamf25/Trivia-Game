import { USER_LOGIN,
  PLAY,
  receiveFailure,
  requestAPI,
  receiveSuccess } from './actionstypes';

export const actionLogin = (value) => ({ type: USER_LOGIN, value });

export const actionPlay = (value) => ({ type: PLAY, value });

export const actionRequest = () => ({ type: requestAPI });

export const actionGetToken = (token) => ({ type: receiveSuccess, token });

export const actionFailure = (error) => ({ type: receiveFailure, error });
