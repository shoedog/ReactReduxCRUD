import 'isomorphic-fetch';
import { normalize, Schema, arrayOf } from 'normalizr';

// Create songs schema for normalizr
const songs = new Schema('songs');

// Utility to convert response stream from fetch to JSON
export const toJson = (res) => res.json();

// Utility for bad status code for fetch
// ( fetch promises by default are only rejected if connection fails )
export const checkStatus = (res) => {
  const { status } = res;
  if (status >= 200 && status < 300) {
    return res;
  }

  return Promise.reject(new Error(res.statusText || res.status));
};

// Wrapper for fetch to call checkStatus() and toJson()
export const fetchJson = (url, options = {}) => (
  fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(checkStatus)
    .then(toJson)
);

// Process data from fetch:
export const normalizeSongList = (data) => normalize(data, arrayOf(songs));

// Process object returned from normalizeSongList into songs and songdIds
export const returnSongsAndIds = ({ entities: {songs}, result: songIds }) => ({
  songs,
  songIds,
});

export default {
  songs: {
    fetch() {
      return fetchJson('/songs')
        .then(normalizeSongList)
        .then(returnSongsAndIds);
    },

    add(artist, songTitle, favorite, listenCount, rating) {
      return fetchJson(
        '/songs',
        {
          method: 'POST',
          body: JSON.stringify({ artist, songTitle, favorite, listenCount, rating }),
        }
      );
    },

    update(id, artist, songTitle, favorite, listenCount, rating) {
      return fetchJson(
        `/songs/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ artist, songTitle, favorite, listenCount, rating }),
        }
      );
    },

    delete(id) {
      return fetch(`/songs/${id}`,
        {
          method: 'DELETE'
        })
        .then(checkStatus)
        .then((res) => res.text());
    },
  },
};
