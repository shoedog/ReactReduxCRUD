export const getMockState = {
  withNoSongs: () => ({
    byId: {},
    ids: [],
    openSongId: null,
  }),
  withOneSong: () => ({
    byId: {
      'id-123': {
        id: 'id-123',
        artist: 'Will Smith',
        songTitle: 'Big Willie Style',
        favorite: true,
        listenCount: 5,
        rating: '5 stars',
      },
    },
    ids: [ 'id-123' ],
    openSongId: 'id-123',
  }),
  withTwoSongs: () => ({
    byId: {
      'id-123': {
        id: 'id-123',
        artist: 'Will Smith',
        songTitle: 'Big Willie Style',
        favorite: true,
        listenCount: 5,
        rating: '5 stars',
      },
      'id-456': {
        id: 'id-456',
        artist: 'George',
        songTitle: 'Hey Hey Hey',
        favorite: false,
        listenCount: 1,
        rating: '1 star',
      },
    },
    ids: [ 'id-123', 'id-456' ],
    openSongId: 'id-456',
  }),
  withNoOpenSongs: () => ({
    byId: {
      'id-123': {
        id: 'id-123',
        artist: 'Will Smith',
        songTitle: 'Big Willie Style',
        favorite: true,
        listenCount: 5,
        rating: '5 stars',
      },
    },
    ids: [ 'id-123'],
    openSongId: null,
  }),
};

export const getActionPayload = {
  fetchSongsSuccess: () => ({
    songs: {
      'id-123': {
        id: 'id-123',
        artist: 'Will Smith',
        songTitle: 'Big Willie Style',
        favorite: true,
        listenCount: 5,
        rating: '5 stars',
      },
    },
    songIds: [ 'id-123' ],
  }),

  addSongSuccess: () => ({
    artist: 'Will Smith',
    songTitle: 'Big Willie Style',
    favorite: true,
    listenCount: 5,
    rating: '5 stars',
    id: 'id-123',
  }),

  updateServerSuccess: () => ({
    id: 'id-123',
    artist: 'Will Smith',
    songTitle: 'Big Willie Style',
    favorite: true,
    listenCount: 5,
    rating: '5 stars',
  }),
};