import * as t from './actionTypes';

export const addUser = (user) => ({ type: t.ADD_USER, user });
export const removeUser = (userId) => ({ type: t.REMOVE_USER, userId });
