import test from 'tape';
import * as reducers from './asyncReducers';
import * as actions from '../actions/asyncActions';
import { getMockState, getActionPayload } from '../testUtils';

// byId reducer
test('reducer | byId :: Handle "fetchSongsSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withNoSongs();
  const fetchedSongs = getActionPayload.fetchSongsSuccess();
  const actualNextState = reducers.byId(
    state.byId,
    actions.fetchSongsSuccess(fetchedSongs)
  );

  const songId = fetchedSongs.songIds[0];
  const expectedNextState = {
    [songId]: fetchedSongs.songs[songId],
  };

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | byId :: Handle "addSongSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withNoSongs();
  const newSong = getActionPayload.addSongSuccess();
  const actualNextState = reducers.byId(
    state.byId,
    actions.addSongSuccess(newSong)
  );

  const expectedNextState = {
    [newSong.id]: newSong,
  };

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | byId :: Handle "updateSongServerSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withOneSong();
  const updatedSong = getActionPayload.updateServerSuccess();
  const actualNextState = reducers.byId(
    state.byId,
    actions.updateSongServerSuccess(updatedSong)
  );

  const expectedNextState = {
    [updatedSong.id]: updatedSong,
  };

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | byId :: Handle "removeNoteSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withOneSong();
  const actualNextState = reducers.byId(
    state.byId,
    actions.removeSongSuccess({ id: 'id-123' })
  );

  const expectedNextState = {};

  deepEqual(actualNextState, expectedNextState);
  end();
});

// ids reducer

test('reducer | ids :: Handle "fetchSongsSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withNoSongs();
  const actualNextState = reducers.ids(
    state.ids,
    actions.fetchSongsSuccess(getActionPayload.fetchSongsSuccess())
  );

  const expectedNextState = [ 'id-123' ];

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | ids :: Handle "addSongSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withNoSongs();
  const newSong = getActionPayload.addSongSuccess();
  const actualNextState = reducers.ids(
    state.ids,
    actions.addSongSuccess(getActionPayload.addSongSuccess())
  );

  const expectedNextState = [ 'id-123' ];

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | ids :: Handle "removeNoteSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withOneSong();
  const actualNextState = reducers.ids(
    state.ids,
    actions.removeSongSuccess({ id: 'id-123' })
  );

  const expectedNextState = [];

  deepEqual(actualNextState, expectedNextState);
  end();
});

// openNoteId reducer

test('reducer | openSongId :: Handle "addSongSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withNoOpenSongs();
  const actualNextState = reducers.openSongId(
    state.openSongId,
    actions.addSongSuccess(getActionPayload.addSongSuccess())
  );

  const expectedNextState = 'id-123';

  deepEqual(actualNextState, expectedNextState);
  end();
});

test('reducer | openSongId :: Handle "removeNoteSuccess" action', ({ deepEqual, end }) => {
  const state = getMockState.withOneSong();
  const actualNextState = reducers.openSongId(
    state.openSongId,
    actions.removeSongSuccess({ id: 'id-123' })
  );

  const expectedNextState = null;

  deepEqual(actualNextState, expectedNextState);
  end();
});