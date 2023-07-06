import React, {Component} from 'react';
import DailyBibleQuote from '../Components/HomePage/DailyBibleQuote';
import './HomePage.css';
import Welcome from '../Components/HomePage/Welcome';
import Activities from '../Components/HomePage/Activities';
import AllNews from '../Components/News/AllNews';
import PhotoCarousel from "../Components/HomePage/PhotoCarousel";
import Header from "../Components/PageElements/Header";
import Notes from "../Components/News/Notes";

export default class HomePage extends Component {
  static displayName = HomePage.name;

  render() {
    return (
      <div className="home">
        <Header>
          <PhotoCarousel/>
          <DailyBibleQuote/>
        </Header>

        <div className="home__background">
          <div className="home__welcome_container">
            <Welcome/>
            <Notes/>
          </div>

          <Activities/>
          <AllNews/>
        </div>
      </div>
    );
  }
}