import { combineReducers } from 'redux';
import {
  UPDATE_SONG, REFRESH_SONG_LIST,
  REQUEST_SONG_LIST, RECEIVE_SONG_LIST,
  ADD_SONG, EDIT_SONG_FIELD
} from './actions';

const initialState = {
  songList: [],
  song: {
    artist: '',
    songTitle: '',
    listenCount: '',
    favorite: '',
    rating: ''
  }
}

const song = (state = {}, action) => {
  switch (action.type) {
    case EDIT_SONG_FIELD:
      return {
        songIndex: action.songIndex,
        songFieldKey: action.songFieldKey,
        songFieldValue: action.songFieldValue
      }
    default:
      return state;
  }
}

const songListReductions = (state = {
  isFetching: false,
  refreshAble: false,
  songList: []
}, action) => {
  switch (action.type) {
    case REFRESH_SONG_LIST:
      return Object.assign({}, state, {
        ...state,
        refreshAble: true
      })
    case REQUEST_SONG_LIST:
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
        refreshAble: false
      })
    case RECEIVE_SONG_LIST:
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        refreshAble: false,
        songList: action.songList,
        lastUpdated: action.receivedAt
      })
    default:
      return state;
  }
}

const songsFromSongList = (state = {}, action) => {
  switch (action.type) {
    case REFRESH_SONG_LIST:
    case RECEIVE_SONG_LIST:
    case REQUEST_SONG_LIST:
      return Object.assign({}, state, {
        ...state,
        [action.songList]: songs(state[action.songList], action)
      })
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  songsFromSongList,
  song
});

export default rootReducer;
