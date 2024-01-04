// tests/setup.js

let authToken, userId, noteId;

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
// Other setup code can go here if needed
