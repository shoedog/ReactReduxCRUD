import { combineReducers } from 'redux';
import { merge, dissoc, prepend, without } from 'ramda';
import {
  UPDATE_SONG, REFRESH_SONG_LIST,
  REQUEST_SONG_LIST, RECEIVE_SONG_LIST,
  ADD_SONG, EDIT_SONG_FIELD, REMOVE_SONG,
  OPEN_SONG, CLOSE_SONG, FORM_UPDATE_VALUE
} from '../actions';

export const byId = ( state = {}, { type, payload }) => {
  switch (type) {
    case ADD_SONG:
    case UPDATE_SONG:
      return merge(state, { [payload.id ]: payload });
    case REMOVE_SONG:
      return dissoc(payload.id, state);
    default:
      return state;
  }
}

export const ids = ( state = [], { type, payload }) => {
  switch (type) {
    case ADD_SONG:
      return prepend(payload.id, state );
    case REMOVE_SONG:
      return without(payload.id, state );
    default:
      return state;
  }
}

export const openSongId = ( state = null, { type, payload}) => {
  switch (type) {
    case OPEN_SONG:
    case ADD_SONG:
      return payload.id;
    case CLOSE_SONG:
    case REMOVE_SONG:
      return null;
    default:
      return state;
  }
}

//export const songField ( state = {}, )

export default combineReducers({
  byId,
  ids,
  openSongId,
});
