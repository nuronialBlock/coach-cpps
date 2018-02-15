import * as types from 'actions/actionTypes';

function setUser(user) {
  return {
    type: types.SET_USER,
    user,
  };
}

export function fetchUser() {
  return async (dispatch) => {
    try {
      let resp = await fetch('/api/v1/users/session', {
        credentials: 'same-origin',
      });
      resp = await resp.json();
      dispatch(setUser(resp));
    } catch (err) {
      console.error(`Failed to fetch: ${err}`);
    }
  };
}
