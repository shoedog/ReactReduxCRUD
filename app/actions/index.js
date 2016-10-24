import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import axios from 'axios';
import querystring from 'querystring';
import { v4 } from 'uuid';

export const ADD_SONG = 'ADD_SONG';
export const REMOVE_SONG = 'REMOVE_SONG';
export const OPEN_SONG = 'OPEN_SONG';
export const CLOSE_SONG = 'CLOSE_SONG';
export const UPDATE_SONG = 'UPDATE_SONG';

export const addSong = (artist = '', songTitle = '', favorite = '',
                        listenCount = '', rating = '', id = v4() ) => ({
  type: ADD_SONG,
  payload: {
    id,
    artist,
    songTitle,
    favorite,
    listenCount,
    rating
  },
});

export const removeSong = (id: '') => ({
  type: REMOVE_SONG,
  payload: { id },
});

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

/*
export function requestSongEdit(songIndex) {
  return function (dispatch) {
    dispatch(updateSong(song, songIndex))

    return axios.put('/editTrack',
      querystring.stringify({
        artist: songIndex.artist,
        songTitle: songIndex.songTitle,
        listenCount: songIndex.listenCount,
        favorite: songIndex.isChecked,
        rating: songIndex.rating,
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log("error submitting")
      console.log(error);
    }).then( retrieveSongList())
  }
}
*/