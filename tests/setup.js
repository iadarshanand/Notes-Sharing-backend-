// tests/setup.js

let authToken, userId, noteId, username;

export const getAuthToken = () => authToken;

export const setAuthToken = (token) => {
  authToken = token;
};

export const getUserId = () => userId;

export const SetUserId = (id) => {
  userId = id;
};

export const getNoteId = () => noteId;

export const setNoteId = (id) => {
  noteId = id;
};

export const getUserName = () => username;

export const setUserName = (user) => {
  username = user;
};
