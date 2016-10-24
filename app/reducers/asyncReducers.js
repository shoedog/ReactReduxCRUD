import { combineReducers } from 'redux';
import { dissoc, without, merge, prepend } from 'ramda';
import { OPEN_SONG, CLOSE_SONG, UPDATE_SONG } from '../actions';

export const byId = (state = {}, { type, payload, meta, error }) => {
  switch (type) {
    case 'fetchSongs':
      if (meta.done && !error) {
        return payload.songs;
      }
      return state;
    case 'addSong':
      if (meta.done && !error) {
        return merge( state, { [payload.id]: payload });
      }
      return state;
    case UPDATE_SONG:
      return merge(state, { [payload.id]: payload});
    case 'updateSongServer':
      if(meta.done && !error) {
        return merge(state, { [payload.id]: payload });
      }
      return state;
    case 'removeSong':
      if(meta.done && !error) {
        return dissoc(payload.id, state);
      }
      return state;
    default:
      return state;
  }
};

export const ids = (state = [], { type, payload, meta, error}) => {
  switch (type) {
    case 'fetchSongs':
      if (meta.done && !error) {
        return payload.songIds;
      }
      return state;
    case 'addSong':
      if (meta.done && !error) {
        return prepend(payload.id, state);
      }
      return state;
    case 'removeSong':
      if(meta.done && !error) {
        return without(payload.id, state);
      }
      return state;
    default:
      return state;
  }
};

export const openSongId = (state = null, { type, payload, meta, error}) => {
  switch (type) {
    case 'addSong':
      if (meta.done && !error) {
        return payload.id;
      }
      return state;
    case OPEN_SONG:
      return payload.id;
    case CLOSE_SONG:
      return null;
    case 'removeSong':
      if(meta.done && !error) {
        return null;
      }
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  byId,
  ids,
  openSongId,
});