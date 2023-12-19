import React from 'react';
import DailyBibleQuote from '../Components/HomePage/DailyBibleQuote';
import './HomePage.css';
import Welcome from '../Components/HomePage/Welcome';
import Activities from '../Components/HomePage/Activities';
import AllNews from '../Components/News/AllNews';
import PhotoCarousel from "../Components/HomePage/PhotoCarousel";
import Notes from "../Components/News/Notes";
import {defaultPage, IPage} from "../Domain/IPage";
import Api from "../Utiles/Api";
import log from "loglevel";
import Body from "../Components/PageElements/Body";

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
    document.title = 'English speaking Catholic community in Slovakia Bratislava.';
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    window.scrollTo(0, 0);
    try {
      Api.getPage('home').then((page) => {
        if (page) {
          page.images ??= [];
          this.setState({page});
          script.innerHTML = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "English Catholic Community in Bratislava, Slovakia",
            "datePublished": page.date,
          });
          document.head.appendChild(script);
        }
      });
    } catch (e) {
      log.info(e);
    }
  }

  render() {
    return (
      <Body
        headerContent={
          <>
            <PhotoCarousel images={[this.state.page.mainImage, ...this.state.page.images]}/>
            <DailyBibleQuote/>
          </>
        }
        headerClassName='home__mobile_header'
        className='home__background'
      >
        <div className="home__welcome_container">
          <h1 className="home__welcome_title">Welcome</h1>
          <div className="home__welcome_container2">
            <Welcome text={this.state.page.body}/>
            <Notes homeNotes={true}/>
          </div>
        </div>

        <Activities/>
        <AllNews homeOnly={true}/>
      </Body>
    );
  }
}