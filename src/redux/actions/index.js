import { USER_LOGIN, PLAY } from './actionstypes';

export const actionLogin = (value) => ({ type: USER_LOGIN, value });

export const actionPlay = (value) => ({ type: PLAY, value });
