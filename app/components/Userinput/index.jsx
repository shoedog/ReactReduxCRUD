import React, { Component, PropTypes, defaultProps } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import * as style from './style';

class Inputform extends Component {
  state = {
    id: this.props.song.id || '',
    artist: this.props.song.artist || '',
    songTitle: this.props.song.songTitle || '',
    favorite: this.props.song.favorite === 'true',
    listenCount: this.props.song.listenCount || '',
    rating:this.props.song.rating || '',
  }

  handleArtistNameChange(e) {
    this.setState({artist: e.target.value});
  }

  handleListenCountChange(e) {
    this.setState({listenCount: e.target.value});
  }

  handleSongTitleChange(e) {
    this.setState({songTitle: e.target.value});
  }

  onCheckChange(e) {
    this.setState({favorite: !this.state.favorite});
  }

  handleOptionChange(e) {
    this.setState({
      rating: e.target.value
    });
  }

  handleSubmit(e, artist, songTitle, listenCount, favorite, rating, id ) {
    e.preventDefault();
    favorite = favorite.toString();
    this.props.updateSong( id, artist, songTitle, favorite, listenCount, rating);
    /*axios.post('/addTrack',
      querystring.stringify({
        artist: this.state.artist,
        songTitle: this.state.songTitle,
        listenCount: this.state.listenCount,
        favorite: this.state.isChecked,
        rating: this.state.rating,
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log("error submitting")
      console.log(error);
    });

   */
  }

  render() {
    return (
      <form style={style.song} id="submitForm" onSubmit={(e, artist, songTitle, listenCount, favorite, rating ) => this.handleSubmit(e, this.state.artist, this.state.songTitle, this.state.listenCount, this.state.favorite, this.state.rating, this.state.id)}>
        <div style={style.row}>
          <label style={style.label} htmlFor="name">Artist Name: </label>
          <input name="artist" type="text" placeholder="Artist Name" value={this.state.artist} onChange={(e) => this.handleArtistNameChange(e)}/>
        </div>
        <div style={style.row}>
          <label style={style.label} htmlFor="listenCount">Listen Count: </label>
          <input name="listenCount" type="number" placeholder="1" value={this.state.listenCount} onChange={(e) => this.handleListenCountChange(e)}/>
        </div>
        <div style={style.row}>
          <label style={style.label} htmlFor="songTitle">Song Title: </label>
          <input name="songTitle" type="text" placeholder="Song Title" value={this.state.songTitle} onChange={(e) => this.handleSongTitleChange(e)}/>
        </div>
        <div style={style.row}>
          <label style={style.label}>Favorite? </label>
          <input name="fav" type="checkbox" value={this.state.favorite} checked={this.state.favorite} onClick={(e) => this.onCheckChange(e)}/>
        </div>
        <div style={ {marginTop: '1rem'} }>
          <p style={Object.assign({}, style.label, {margin: '0'})} >Rating:</p>
          <div className="radio">
              <input type="radio" name="rating" value="1 Star" checked={this.state.rating === '1 Star'} onClick={(e) => this.handleOptionChange(e)} />
            <label style={style.radioLabel}>1 Star</label>
          </div>
          <div className="radio">
              <input type="radio" name="rating" value="2 Stars" checked={this.state.rating  === '2 Stars'} onClick={(e) => this.handleOptionChange(e)} />
            <label style={style.radioLabel}>2 Stars</label>
          </div>
          <div className="radio">
              <input type="radio" name="rating" value="3 Stars" checked={this.state.rating  === '3 Stars'} onClick={(e) => this.handleOptionChange(e)} />
              <label style={style.radioLabel}>3 Stars</label>
          </div>
          <div className="radio">
              <input type="radio" name="rating" value="4 Stars" checked={this.state.rating  === '4 Stars'} onClick={(e) => this.handleOptionChange(e)} />
              <label style={style.radioLabel}>4 Stars</label>
          </div>
          <div className="radio">
              <input type="radio" name="rating" value="5 Stars" checked={this.state.rating  === '5 Stars'} onClick={(e) => this.handleOptionChange(e)} />
            <label style={style.radioLabel}>5 Stars</label>
          </div>
        </div>
        <input type="submit" value="Save" style={style.button} />
      </form>
    );
  }
}

/*
Inputform.defaultProps = {
  artist: '',
  listenCount: 1,
  songTitle: '',
  isChecked: false,
  rating: '3 Stars',
};*/

Inputform.PropTypes = {
  artist: PropTypes.string,
  songTitle: PropTypes.string,
  listenCount: PropTypes.number,
};

export default Inputform;
