import React, { Component, PropTypes, defaultProps } from 'react';
import axios from 'axios';
import formSerialize from 'form-serialize';

class Inputform extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: this.props.artist,
      songTitle: this.props.songTitle,
      listenCount: this.props.listenCount,
      isChecked: this.props.isChecked,
      rating: this.props.rating,
    }
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
  handleSubmit(e) {
    e.preventDefault();

    if( !songTitle || !artist ){
      return;
    }
    let formData = formSerialize(e.target, {empty: true});
    console.log(formData);
    postData(formData)
    this.setState({artist: '', listenCount: 1, songTitle: '', isChecked: false, rating: '3 Stars'});
  }
  onCheckChange(e) {
    this.setState({isChecked: !this.state.isChecked});
  }
  handleOptionChange(e) {
    this.setState({
      rating: e.target.value
    });
  }
  postData(data) {
    axios.post('/addTrack', {
      data
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <form id="submitForm" onSubmit={(e) => this.handleSubmit(e)}>
        <div>
          <label htmlFor="name">Artist Name (required): </label>
          <input name="artist" required="true" type="text" placeholder="Artist Name" value={this.state.artist} onChange={(e) => this.handleArtistNameChange(e)}/>
        </div>
        <div>
          <label htmlFor="listenCount">Times Listened To: </label>
          <input name="listenCount" type="number" placeholder="1" value={this.state.listenCount} onChange={(e) => this.handleListenCountChange(e)}/>
        </div>
        <div>
          <label htmlFor="songTitle">Song Title (required): </label>
          <input name="songTitle" required="true" type="text" placeholder="songTitle" value={this.state.songTitle} onChange={(e) => this.handleSongTitleChange(e)}/>
        </div>
        <div>
          <label>Add to Favs?  </label>
          <input name="fav" type="checkbox" value={this.state.isChecked} checked={this.state.isChecked} onChange={(e) => this.onCheckChange(e)}/>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="rating" value="1 Star"
              checked={this.state.rating === '1 Star'}
              onChange={(e) => this.handleOptionChange(e)} />
            1 Star
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="rating" value="2 Stars"
              checked={this.state.rating === '2 Stars'}
              onChange={(e) => this.handleOptionChange(e)} />
            2 Stars
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="rating" value="3 Stars"
              checked={this.state.rating === '3 Stars'}
              onChange={(e) => this.handleOptionChange(e)} />
            3 Stars
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="rating" value="4 Stars"
              checked={this.state.rating === '4 Stars'}
              onChange={(e) => this.handleOptionChange(e)} />
            4 Stars
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="rating" value="5 Stars"
              checked={this.state.rating === '5 Stars'}
              onChange={(e) => this.handleOptionChange(e)} />
            5 Stars
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

Inputform.defaultProps = {
  artist: '',
  listenCount: 1,
  songTitle: '',
  isChecked: false,
  rating: '3 Stars',
};

Inputform.PropTypes = {
  artist: PropTypes.string,
  songTitle: PropTypes.string,
  listenCount: PropTypes.number,
}

export default Inputform;
