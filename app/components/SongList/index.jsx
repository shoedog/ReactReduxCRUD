import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/asyncActions';
import * as selectors from '../../store/selectors';
import * as style from './style';

class SongList extends Component {

  componentWillMount() {
    this.props.fetchSongs();
  }

  render() {
    const {songs, openSongId, addSong, openSong} = this.props;
    return (
      <div style={style.wrapper}>
        <button style={style.addSongButton} onClick={() => addSong()}>Add Song</button>
        {(songs.length === 0)
          ? <div style={style.blankslate}>No Songs</div>
          : songs.map((song) => (
          <button key={song.id} style={(song.id === openSongId)
            ? {...style.song, ...style.selected}
            : style.song
          }
                  onClick={() => openSong(song.id)}>
            {song.artist === ' ' ?
              <span style={style.newSongLabel}>New Song...</span>
              : <div>
              Artist: {song.artist} <br/>
              Title: {song.songTitle} <br/>
              Listen Count: {song.listenCount} <br/>
              Favorite: {song.favorite} <br/>
              Rating: {song.rating}
            </div> }
          </button>
        ))
        }
      </div>
    )
  };
}


SongList.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape({
    artist: PropTypes.string.isRequired,
    songTitle: PropTypes.string.isRequired,
    favorite: PropTypes.string.isRequired,
    listenCount: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  openSong: PropTypes.func.isRequired,
  addSong: PropTypes.func.isRequired,
  openSongId: PropTypes.string,
  fetchSongs: PropTypes.func.isRequired,
};

const selector = (state) => ({
  songs: selectors.getSongs(state),
  openSongId: selectors.getOpenSongId(state),
});

export default connect(selector, actionCreators)(SongList);
