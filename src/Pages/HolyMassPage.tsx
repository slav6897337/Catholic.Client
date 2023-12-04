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
            <p className={styles.left}><strong>Holly Masses</strong> at Church of St. Ladislaus</p>
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

          <h1 className={styles.howToFindUs}>HOW TO FIND US</h1>
          <div className={styles.bottomContainer}>
            <Map/>
            <img className={styles.churchPhoto} src={'/img/churchPhoto.png'} alt={'Church'}/>
          </div>

        </div>
      </div>
    );
  }
}