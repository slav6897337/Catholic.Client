import React from 'react';
import DailyBibleQuote from '../Components/HomePage/DailyBibleQuote';
import './HomePage.css';
import Welcome from '../Components/HomePage/Welcome';
import Activities from '../Components/HomePage/Activities';
import AllNews from '../Components/News/AllNews';
import PhotoCarousel from "../Components/HomePage/PhotoCarousel";
import Header from "../Components/PageElements/Header";
import Notes from "../Components/News/Notes";
import {defaultPage, IPage} from "../Domain/IPage";
import Api from "../Utiles/Api";
import log from "loglevel";

interface IState {
  page: IPage;
}

export default class HomePage extends React.Component<{}, IState> {
  static displayName = HomePage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      page: defaultPage,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    try {
      Api.getPage('home').then((page) => {
        if (page) {
          page.images ??= [];
          this.setState({page})
        }
      });
    } catch (e) {
      log.info(e);
    }
  }

  render() {
    return (
      <div>
        <Header>
          <PhotoCarousel images={[this.state.page.mainImage, ...this.state.page.images]}/>
          <DailyBibleQuote/>
        </Header>

        <div className="home__background body">
          <div className="home__welcome_container">
            <h2 className="home__welcome_title">Welcome</h2>
            <div className="home__welcome_container2">
              <Welcome text={this.state.page.body}/>
              <Notes homeNotes={true}/>
            </div>
          </div>

          <Activities/>
          <AllNews homeOnly={true}/>
        </div>
      </div>
    );
  }
}