import test from 'tape';
import * as selectors from './selectors';
import { getMockState } from '../testUtils';

test('selector | getSongs :: return empty array if state has no songs',
  ({ deepEqual, end }) => {
    const state = getMockState.withNoSongs();

    const actualSelection = selectors.getSongs(state);
    const expectedSelection = [];

    deepEqual(actualSelection, expectedSelection);
    end();
  }
)

test('selector | getSongs :: return array of songs if state has songs',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneSong();

    const actualSelection = selectors.getSongs(state);
    const expectedSelection = [
      {
        id: 'id-123',
        artist: 'Will Smith',
        songTitle: 'Big Willie Style',
        favorite: true,
        listenCount: 5,
        rating: '5 stars',
      },
    ];

    deepEqual(actualSelection, expectedSelection);
    end();
  }
)

test('selector | getOpenSongId :: return null if state doesnt have open song',
  ({ deepEqual, end }) => {
    const state = getMockState.withNoSongs();

    const actualSelection = selectors.getOpenSongId(state)
    const expectedSelection = null;

    deepEqual(actualSelection, expectedSelection);
    end();
  }
)

test('selector | getOpenSongId :: return id if state has open song',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneSong();

    const actualSelection = selectors.getOpenSongId(state, 'id-123');
    const expectedSelection = 'id-123';

    deepEqual(actualSelection, expectedSelection);
    end();
  }
)

test('selector | getSong :: return null if state has no song with supplied id',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneSong();

    const actualSelection = selectors.getSong(state, 'id-999');
    const expectedSelection = null;

    deepEqual(actualSelection, expectedSelection);
    end();
  }
)

test('selector | getSong :: return song object if state has song with supplied id',
  ({ deepEqual, end }) => {
    const state = getMockState.withOneSong();

    const actualSelection = selectors.getSong(state, 'id-123');
    const expectedSelection = {
      id: 'id-123',
      artist: 'Will Smith',
      songTitle: 'Big Willie Style',
      favorite: true,
      listenCount: 5,
      rating: '5 stars',
    };


    deepEqual(actualSelection, expectedSelection);
    end();
  }
)
