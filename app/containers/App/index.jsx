import React from 'react';
import { Link } from 'react-router';
import SongList from '../../components/SongList';
import SongDetail from '../../components/SongDetail';
import * as style from './style';

const App = () => (
  <div style={style.wrapper}>
    <SongList />
    <SongDetail />
  </div>
);


export default App;
