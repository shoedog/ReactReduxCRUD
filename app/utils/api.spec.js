import test from 'tape';
import fetchMock from 'fetch-mock';

import api from './api';
import { testErrorRejection } from './testUtils';

test('api | songs.fetch ::', (t1) => {
  const SONG_ONE = {
    id: 123,
    artist: 'Will Smith',
    songTitle: 'Big Willie Style',
    favorite: 'true',
    listenCount: '5',
    rating: '5 stars',
  };
  const SONG_TWO = {
    id: 456,
    artist: 'Rick James',
    songTitle: 'Yeaaaah',
    favorite: 'false',
    listenCount: '10',
    rating: '3 stars',
  };

  const DUMMY_CREATE_RESPONSE = [ SONG_ONE, SONG_TWO ];

  t1.test('Returns songs and song ids', ({ deepEqual, end }) => {
    fetchMock.mock('/songs', DUMMY_CREATE_RESPONSE);
    api.songs
      .fetch()
      .then(({ songs, songIds }) => {
        const  expectedSongs = {
          [SONG_ONE.id]: SONG_ONE,
          [SONG_TWO.id]: SONG_TWO,
        };
        const expectedSongIds = [ 123, 456 ];

        deepEqual(songIds, expectedSongIds);
        deepEqual(songs, expectedSongs);

        end();
      });
  });

  t1.test('Gets rejected with an error and status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/songs',
      equal,
      func: () => api.songs.fetch(),
    })
      .then(() => end());
  });

  t1.test('Teardown', ({ end }) => {
    fetchMock.restore();
    end();
  });
});


test('api | songs.add ::', (t1) => {
  const SONG = {
    id: 123,
    artist: 'Will Smith',
    songTitle: 'Big Willie Style',
    favorite: 'true',
    listenCount: '5',
    rating: '5 stars',
  };

  t1.test('Returns a new song from the api', ({ deepEqual, end }) => {
    fetchMock.post('/songs', (url, options) => {
      const { content } = JSON.parse(options.body);
      console.log({content});
      return {
        ...SONG,
        content,
      };
    });

    api.songs
      .add('Will Smith', 'Big Willie Style', 'true', '5', '5 stars')
      .then((song) => {
        console.log(song);
        const expectedSong = {
          ...SONG,
          artist: 'Will Smith',
          songTitle: 'Big Willie Style',
          favorite: 'true',
          listenCount: '5',
          rating: '5 stars',
        };
        deepEqual(song, expectedSong);
        end();
      });
  });

  t1.test('Gets rejected with an error and status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/songs',
      equal,
      method: 'POST',
      func: () => api.songs.add('test'),
    })
      .then(() => end());
  });

  t1.test('Teardown', ({ end }) => {
    fetchMock.restore();
    end();
  });
});

test('api | songs.update ::', (t1) => {
  const SONG = {
    id: 123,
    artist: 'Will Smith',
    songTitle: 'Big Willie Style',
    favorite: 'true',
    listenCount: '5',
    rating: '5 stars',
  };

  t1.test('Returns an updated song from the api', ({deepEqual, end}) => {
    fetchMock.put('/songs/123', (url, options) => {
      const { artist, songTitle, favorite, listenCount, rating } = JSON.parse(options.body);
      return {
        ...SONG,
        artist,
        songTitle,
        favorite,
        listenCount,
        rating,
      };
    });

    api.songs
      .update(123, 'Will Smith', 'Big Willie Style', 'true', '5', '5 stars')
      .then((song) => {
        const expectedSong = {
          ...SONG,
          artist: 'Will Smith',
          songTitle: 'Big Willie Style',
          favorite: 'true',
          listenCount: '5',
          rating: '5 stars',
        };
        deepEqual(song, expectedSong);
        end()
      });
  });

  t1.test('Gets rejected with an error and status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/songs/123',
      equal,
      method: 'PUT',
      func: () => api.songs.update(123, 'test'),
    })
      .then(() => end());
  });

  t1.test('Teardown', ({ end }) => {
    fetchMock.restore();
    end();
  });

});

test( 'api | songs.delete ::', (t1) => {
  t1.test('Removes a song from the api', ({ equal, end }) => {
    fetchMock.delete('/songs/123', 200  );

    api.songs
      .delete(123)
      .then((res => {
        equal(res, '');
        end();
      }));
  });

  t1.test('Gets rejected with an error and status text if the status is not 2xx', ({ equal, end }) => {
    testErrorRejection({
      path: '/songs/123',
      equal,
      method: 'DELETE',
      func: () => api.songs.delete(123),
    })
      .then(() => end());
  });

  t1.test('Teardown', ({ end }) => {
    fetchMock.restore();
    end();
  });
});















