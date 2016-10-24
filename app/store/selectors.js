export const getSongs = (state) =>
  state.ids.map((id) => state.byId[id]);

export const getOpenSongId = (state) =>
  state.openSongId;

export const getSong = (state, id) =>
  state.byId[id] || null;
