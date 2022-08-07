import { actionRequest, actionReciveTrivia, actionFailure } from '../redux/actions';
import { fetchTrivia } from './fetchAPI';

function funcTrivia() {
  return async (dispatch) => {
    dispatch(actionRequest());
    try {
      const token = localStorage.getItem('token');
      const data = await fetchTrivia(token);
      dispatch(actionReciveTrivia(data));
    } catch (error) {
      dispatch(actionFailure(error));
    }
  };
}

export default funcTrivia;
