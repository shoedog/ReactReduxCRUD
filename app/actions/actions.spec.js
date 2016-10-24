import test from 'tape';
import * as actions from './index.js';
import { ADD_SONG, UPDATE_SONG, REMOVE_SONG,
  OPEN_SONG, CLOSE_SONG } from './index.js';

test('action creator | addSong :: Create correct action',
  ({ deepEqual, end }) => {
    const actualAction = actions.addSong('Will Smith', 'Big Willie Style', true, 5, '5 stars', 'id-123');
    const expectedAction = {
      type: ADD_SONG,
      payload: {
        id: 'id-123',
        artist: 'Will Smith',
        songTitle: 'Big Willie Style',
        favorite: true,
        listenCount: 5,
        rating: '5 stars'
      }
    };

    deepEqual(actualAction, expectedAction);
    end();
  }
);

test('action creator | updateSong :: Create correct action',
  ({ deepEqual, end }) => {
    const actualAction = actions.updateSong('Will Smith', 'Big Willie Style', true, 10, '5 stars', 'id-123');
    const expectedAction = {
      type: UPDATE_SONG,
      payload: {
        id: 'id-123',
        artist: 'Will Smith',
        songTitle: 'Big Willie Style',
        favorite: true,
        listenCount: 10,
        rating: '5 stars'
      }
    };

    deepEqual(actualAction, expectedAction);
    end();
  }
);

test('action creator | removeSong :: Create correct action',
  ({ deepEqual, end }) => {
    const actualAction = actions.removeSong('id-123');
    const expectedAction = {
      type: REMOVE_SONG,
      payload: {
        id: 'id-123',
      }
    };

    deepEqual(actualAction, expectedAction);
    end();
  }
);

test('action creator | openSong :: Create correct action',
  ({ deepEqual, end }) => {
    const actualAction = actions.openSong('id-123');
    const expectedAction = {
      type: OPEN_SONG,
      payload: {
        id: 'id-123',
      }
    };

    deepEqual(actualAction, expectedAction);
    end();
  }
);

test('action creator | closeSong :: Create correct action',
  ({ deepEqual, end }) => {
    const actualAction = actions.closeSong('id-123');
    const expectedAction = {
      type: CLOSE_SONG,
    };

    deepEqual(actualAction, expectedAction);
    end();
  }
);
