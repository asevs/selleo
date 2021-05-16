import * as types from '../types/people';

// this is an example action
export const doNothing = (payload) => ({
  type: types.DO_NOTHING,
  payload: payload,
});

export const modifyFilterQuery = (payload) => ({
  type: types.MODIFY_FILTER_QUERY,
  payload: payload,
});
