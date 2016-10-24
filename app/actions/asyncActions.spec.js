import test from 'tape';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './asyncActions';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

// Helper function for tests on return value of action
const assertReturnsFunction = ({ equal, end }, func) => {
  const result = func();
  equal(typeof result, 'function');
  end();
};

// Helper function for tests on dispatched action
const assertFirstDispatchedAction = ({ func, type, deepEqual, end }) => {
  const store = mockStore({});
  store.dispatch(func());
  const dispatchedActions = store.getActions();
  const actualAction = dispatchedActions[0];
  const expectedAction = {
    type,
    meta: {
      done: false,
    },
  };

  deepEqual(actualAction, expectedAction);
  end();
};

// Helper function for tests on dispatched action
const assertLastDispatchedAction = ({ deepEqual, end, func, expectedAction }) => {
  const store = mockStore({});
  store.dispatch(func())
    .then(() => {
      const dispatchedActions = store.getActions();
      const actualAction = dispatchedActions[dispatchedActions.length - 1];
      deepEqual(actualAction, expectedAction);
      end();
    });
};

// Helper function for tests on assertions
const createErrorAction = (type) => ({
  type,
  payload: {},
  error: true,
  meta: { done: true },
});

// Helper function for tests on assertions
const createSuccessAction = (type, payload) => ({
  type,
  payload,
  meta: { done: true },
});

/**
 * Helper function for test skeleton
 * It receives a tape object as test and config as options
 * Each tests sets up a mock value, path, and method for fetch
 * Each test sets up a return success value
 * Each test ensures that the function is returned, and correct functions are dispatched
 */

const testAsyncAction = ({ test}, options) => {
  const {
    path,
    method,
    successMockReturn,
    successPayload,
    failureMockReturn,
    func,
    type,
  } = options;

  test('Setup', ({ end }) => {
    fetchMock.mock(path, successMockReturn, {method});
    end();
  });

  test('Returns a function', (test) => {
    assertReturnsFunction(test, func);
  });

  test('Dispatches an initial action', (test) => {
    assertFirstDispatchedAction({...test, func, type});
  });

  test('Dispatches correct action on success', (test) => {
    const expectedAction = createSuccessAction(type, successPayload);
    assertLastDispatchedAction({ ...test, func, expectedAction});
  });

  test('Dispatches correct action on failure', (test) => {
    fetchMock.restore().mock(path, failureMockReturn, {method});
    const expectedAction = createErrorAction(type);
    assertLastDispatchedAction({ ...test, func, expectedAction });
  });

  test('Teardown', ({end}) => {
    fetchMock.restore();
    end();
  });
};

test('action creator | fetchSongs ::', (t1) => {
  const SONG = {
    id: 'id-123',
    artist: 'Will Smith',
    songTitle: 'Big Willie Style',
    favorite: true,
    listenCount: 5,
    rating: '5 stars'
  };

  const func = () => actions.fetchSongs();
  const type = 'fetchSongs';
  const successPayload = { songIds: [ SONG.id ], songs: { [SONG.id]: SONG } };
  const path = '/songs';
  const method = 'GET';
  const successMockReturn = [ SONG ];
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});

test('action creator | addSong ::', (t1) => {
  const successPayload = {
    id: 123,
    artist: 'Will Smith',
    songTitle: 'Big Willie Style',
    favorite: true,
    listenCount: 5,
    rating: '5 stars'
  };

  const func = () => actions.addSong(
      'Will Smith',
      'Big Willie Style',
      true,
      5,
      '5 stars'
  );
  const type = 'addSong';
  const path = '/songs';
  const method = 'POST';
  const successMockReturn = (url, { body }) => ({
    id: 123,
    artist: 'Will Smith',
    songTitle: 'Big Willie Style',
    favorite: true,
    listenCount: 5,
    rating: '5 stars',
  });
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});

test('action creator | updateSongServer ::', (t1) => {
  const successPayload = {
    id: 123,
    artist: 'Will Smith',
    songTitle: 'Big Willie Style',
    favorite: true,
    listenCount: 5,
    rating: '5 stars'
  };

  const func = () => actions.updateSongServer(
    123,
    'Will Smith',
    'Big Willie Style',
    true,
    5,
    '5 stars'
  );
  const type = 'updateSongServer';
  const path = '/songs/123';
  const method = 'PUT';
  const successMockReturn = (url, { body }) => ({
    id: 123,
    artist: JSON.parse(body).artist,
    songTitle: JSON.parse(body).songTitle,
    favorite: JSON.parse(body).favorite,
    listenCount: JSON.parse(body).listenCount,
    rating: JSON.parse(body).rating,
  });
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});

test('action creator | removeSong ::', (t1) => {
  const func = () => actions.removeSong(123);
  const type = 'removeSong';
  const successPayload = {id: 123};
  const path = '/songs/123';
  const method = 'DELETE';
  const successMockReturn = { status: 200, body: '' };
  const failureMockReturn = { body: {}, status: 400 };

  testAsyncAction(t1, {
    func,
    type,
    successPayload,
    path,
    method,
    successMockReturn,
    failureMockReturn,
  });
});
































