import test from 'tape';
import * as reducers from './reducers';
import * as actions from '../actions';
import { ADD_SONG, UPDATE_SONG, REMOVE_SONG,
  OPEN_SONG, CLOSE_SONG } from '../actions';
import { getMockState } from '../testUtils';


test('reducer | byId :: Handle addSong action',
  ({ deepEqual, end }) => {
    const state = getMockState.withNoSongs();

    const actualNextState = reducers.byId(state.byId, actions.addSong('Will Smith', 'Big Willie Style', true, 5, '5 stars', 'id-123'));
    const expectedNextState = {
      'id-123': {
        id: 'id-123',
        artist: 'Will Smith',
        songTitle: 'Big Willie Style',
        favorite: true,
        listenCount: 5,
        rating: '5 stars'
      }
    };

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | byId :: Handle updateSong action',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneSong();

    const actualNextState = reducers.byId(state.byId, actions.updateSong('Will Smith', 'Big Willie Style', true, 10, '5 stars', 'id-123'));
    const expectedNextState = {
      'id-123': {
        id: 'id-123',
        artist: 'Will Smith',
        songTitle: 'Big Willie Style',
        favorite: true,
        listenCount: 10,
        rating: '5 stars'
      }
    };

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | byId :: Handle removeSong action',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneSong();

    const actualNextState = reducers.byId(state.byId, actions.removeSong('id-123'));
    const expectedNextState = {};


    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | ids :: Handle addSong action',
  ({ deepEqual, end }) => {
    const state = getMockState.withNoSongs();

    const actualNextState = reducers.ids(state.ids, actions.addSong('Will Smith', 'Big Willie Style', true, 5, '5 stars', 'id-123'));
    const expectedNextState = [ 'id-123' ];


    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | ids :: Handle removeSong action',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneSong();

    const actualNextState = reducers.ids(state.ids, actions.removeSong('id-123'));
    const expectedNextState = [];


    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | openSongId :: Handle openSong action',
  ({ deepEqual, end }) => {
    const state = getMockState.withNoOpenSongs();

    const actualNextState = reducers.openSongId(state.openSongId, actions.openSong('id-123'));
    const expectedNextState = 'id-123';

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | openSongId :: Handle addSong action',
  ({ deepEqual, end }) => {
    const state = getMockState.withNoOpenSongs();

    const actualNextState = reducers.openSongId(
      state.openSongId,
      actions.addSong('Will Smith', 'Big Willie Style', true, 5, '5 stars', 'id-123'));
    const expectedNextState = 'id-123';

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | openSongId :: Handle closeSong action',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneSong();

    const actualNextState = reducers.openSongId(
      state.openSongId,
      actions.closeSong('id-123'));
    const expectedNextState = null;

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);

test('reducer | openSongId :: Handle removeSong action',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneSong();

    const actualNextState = reducers.openSongId(
      state.openSongId,
      actions.removeSong('id-123'));
    const expectedNextState = null;

    deepEqual(actualNextState, expectedNextState);
    end();
  }
);
