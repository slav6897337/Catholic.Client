import React, {Component} from 'react';
import DailyBibleQuote from '../components/DailyBibleQuote';
import './HomePage.css';
import Welcome from '../components/Welcome';
import Activities from '../components/Activities';
import AllNews from '../components/AllNews';
import PhotoCarousel from "../components/PhotoCarousel";
import Note from "../components/Note";

export default class HomePage extends Component {
  static displayName = HomePage.name;

  render() {
    return (
      <div className="home">
        <div style={{}}>
          <PhotoCarousel/>
          <DailyBibleQuote/>
        </div>


        <div className="home__background">
          <div className="home__welcome_container">
            <Welcome/>
            <Note/>
          </div>

          <Activities/>
          <AllNews/>
        </div>

      </div>
    );
  }
}