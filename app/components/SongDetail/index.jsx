import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/asyncActions';
import * as selectors from '../../store/selectors';
import * as style from './style';
import UserInput from '../UserInput';

//<UserInput song={song} updateSong={updateSong}/>

const SongDetail = ({ song, removeSong, closeSong, updateSong, updateSongServer }) => (
  <div style={style.wrapper}>
    {!song ? <div style={style.blankslate}>No song is open</div>
      : <div style={style.song}>
        <UserInput key={song.id} song={song} updateSong={updateSongServer} />
        <button style={{...style.button, ...style.danger}} onClick={() => removeSong(song.id)}>Remove</button>
        <button style={style.button} onClick={closeSong}>Close</button>
      </div>
    }
  </div>
)

SongDetail.propTypes = {
  song: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    songTitle: PropTypes.string.isRequired,
    favorite: PropTypes.string.isRequired,
    listenCount: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
  updateSong: PropTypes.func.isRequired,
  removeSong: PropTypes.func.isRequired,
  closeSong: PropTypes.func.isRequired,
  updateSongServer: PropTypes.func.isRequired,
};

const selector = (state) => ({
  song: selectors.getSong(state, selectors.getOpenSongId(state)),
});

export default connect(selector, actionCreators)(SongDetail);
