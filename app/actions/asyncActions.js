import api from '../utils/api';
import { startAction, successAction,
  failureAction, asyncAction } from './asyncActionUtils';
import { v4 } from 'uuid';

export const OPEN_SONG = 'OPEN_SONG';
export const CLOSE_SONG = 'CLOSE_SONG';
export const UPDATE_SONG = 'UPDATE_SONG';

export const openSong = (id: '') => ({
  type: OPEN_SONG,
  payload: { id },
});

export const closeSong = () => ({
  type: CLOSE_SONG,
});

export const updateSong = (artist, songTitle, favorite,
                           listenCount, rating, id) => ({
  type: UPDATE_SONG,
  payload: {
    id,
    artist,
    songTitle,
    favorite,
    listenCount,
    rating
  },
});

/**
 * Fetch songs from server: GET
 * Action Type, start, success, failure, and async actions
 */
const fetchSongsType = 'fetchSongs';
export const fetchSongsStart = startAction(fetchSongsType);
export const fetchSongsSuccess = successAction(fetchSongsType);
export const fetchSongsFailure = failureAction(fetchSongsType);
export const fetchSongs = asyncAction({
  func: () => api.songs.fetch(),
  start: fetchSongsStart,
  success: fetchSongsSuccess,
  failure: fetchSongsFailure,
});

/**
 * Add song to server: POST
 * Action Type, start, success, failure, and async actions
 */
const addSongType = 'addSong';
export const addSongStart = startAction(addSongType);
export const addSongSuccess = successAction(addSongType);
export const addSongFailure = failureAction(addSongType);
export const addSong = asyncAction({
  func: (artist, songTitle, favorite, listenCount, rating) => api.songs.add(),
  start: addSongStart,
  success: addSongSuccess,
  failure: addSongFailure,
});

/**
 * Update song on server: PUT
 * Action Type, start, success, failure, and async actions
 */
const updateSongServerType = 'updateSongServer';
export const updateSongServerStart = startAction(updateSongServerType);
export const updateSongServerSuccess = successAction(updateSongServerType);
export const updateSongServerFailure = failureAction(updateSongServerType);
export const updateSongServer = asyncAction({
  func: (id, artist, songTitle, favorite, listenCount, rating) =>
    api.songs.update(id, artist, songTitle, favorite, listenCount, rating),
  start: updateSongServerStart,
  success: updateSongServerSuccess,
  failure: updateSongServerFailure,
});

/**
 * Remove song from server: DELETE
 * Action Type, start, success, failure, and async actions
 */
const removeSongType = 'removeSong';
export const removeSongStart = startAction(removeSongType);
export const removeSongSuccess = successAction(removeSongType);
export const removeSongFailure = failureAction(removeSongType);
export const removeSong = asyncAction({
  func: (id) => api.songs.delete(id).then(() => ({ id })),
  start: removeSongStart,
  success: removeSongSuccess,
  failure: removeSongFailure,
});



