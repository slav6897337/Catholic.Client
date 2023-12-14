import React from 'react';
import styles from "./HolyMassPage.module.css";
import AllNews from '../Components/News/AllNews';
import Notes from "../Components/News/Notes";
import MainInfo from "../Components/HolyMassPage/MainInfo";
import CalendarWithEvents from "../Components/Calendar/CalendarWithEvents";
import IHolyMass from "../Domain/IHolyMass";
import Map from "../Components/Maps/Maps";
import Header from "../Components/PageElements/Header";
import Api from "../Utiles/Api";
import log from "loglevel";
import {defaultPage, IPage} from "../Domain/IPage";
import ImageGallery from "../Components/Carousel/ImageGallery";

interface IState {
  selectedDate: Date;
  page: IPage;
  holyMasses: IHolyMass[];
}

export default class HolyMassPage extends React.Component<{}, IState> {
  static displayName = HolyMassPage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      page: defaultPage,
      holyMasses: []
    };
  }

  componentDidMount() {
    document.title = 'Schedule and locations of English Catholic Holy Masses in Bratislava, Slovakia.';
    const description = 'Holy Mass is offered in English each Sunday at 11:00am at Sv. Ladislav Catholic Church ... If you cannot attend the 11:00am English mass, attend mass in Slovak ...';
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    const script = document.createElement('script');
    script.type = 'application/ld+json';

    window.scrollTo(0, 0);
    try {
      Api.listHollyMasses().then((masses) => {
        if (masses?.length) {
          this.setState({
            holyMasses: masses
          })
        }
      });
      Api.getPage('holy-mass').then((page) => {
        if (page) {
          page.images ??= [];
          this.setState({page})
          script.innerHTML = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "English Catholic Holy Masses in Bratislava, Slovakia",
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
      <div>

        <Header>
          <div className={styles.titleContainer}>
            <p className={styles.left}><strong>Holly Masses in English Bratislava, Slovakia</strong> at Church of St. Ladislaus</p>
            <p className={styles.right}>each <strong>Sunday at 11:00am</strong> (in English)</p>
          </div>
        </Header>
        <div className={`${styles.hollyMassBody} body`}>


          <div className={styles.mainContainer}>
            <div className={styles.sideContainer}>
              <CalendarWithEvents holyMasses={this.state.holyMasses}/>
              <Notes notesContainer={styles.notesContainer} holyMassOnly={true}/>
            </div>

            <MainInfo page={this.state.page} holyMasses={this.state.holyMasses}/>

          </div>


          <AllNews containerStyle={styles.newsContainerStyle} holyMassOnly={true}/>

          <ImageGallery images={this.state.page.images ?? []}/>

          <h1 className={styles.howToFindUs}>HOW TO FIND US</h1>
          <div className={styles.bottomContainer}>
            <Map/>
            <img className={styles.churchPhoto} src={'/img/churchPhoto.webp'} alt={'Church'}/>
          </div>

        </div>
      </div>
    );
  }
}