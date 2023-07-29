import React from 'react';
import styles from "./HolyMassPage.module.css";
import AllNews from '../Components/News/AllNews';
import Notes from "../Components/News/Notes";
import MainInfo from "../Components/HolyMassPage/MainInfo";
import CalendarWithEvents from "../Components/Calendar/CalendarWithEvents";
import IHolyMass from "../Domain/IHolyMass";
import Map from "../Components/Maps/Maps";
import Header from "../Components/PageElements/Header";

interface IState {
  selectedDate: Date;
}

export default class HolyMassPage extends React.Component<{}, IState> {
  static displayName = HolyMassPage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
  }

  handleDateSelect = (date: Date) => {
    this.setState({selectedDate: date});
  };

  render() {
    return (
      <div className={styles.hollyMassBody}>
        <Header>
          <div className={styles.titleContainer}>
            <p className={styles.left}><strong>Holly Masses</strong> at Church of St. Ladislaus</p>
            <p className={styles.right}>each <strong>Sunday at 11:00am</strong> (in English)</p>
          </div>
        </Header>


        <div className={styles.mainContainer}>
          <div className={styles.sideContainer}>
            <CalendarWithEvents holyMasses={holyMasses}/>
            <Notes notesContainer={styles.notesContainer} holyMassOnly={true}/>
          </div>

          <MainInfo holyMasses={holyMasses}/>

        </div>


        <AllNews containerStyle={styles.newsContainerStyle}/>

        <h1 className={styles.howToFindUs}>HOW TO FIND US</h1>
        <div className={styles.bottomContainer}>
          <Map/>
          <img className={styles.churchPhoto} src={'/img/churchPhoto.png'} alt={'Church'}/>
        </div>

      </div>
    );
  }
}

const holyMasses: IHolyMass[] = [
  {
    date: new Date(2023,5,11,11),
  },
  {
    date: new Date(2023,5,16,18, 30),
    description: "Solemnity of the Sacred Heart of Jesus (not a holy day of obligation).",
  },
  {
    date: new Date(2023,5,18,11),
  },
  {
    date: new Date(2023,5,25,11),
    description: "Confirmation of the adults with archbishop Nicola Girasoli, papal Nuncio.",
  },
  {
    date: new Date(2023,6,2,11),
  },
  {
    date: new Date(2023,6,5,11),
    description: "Solemtnity of Saints Cyril and Methodius (not a holy day of obligation).",
  },
  {
    date: new Date(2023,6,7,18, 30),
    description: "First Friday of July.Sunday, July 9 at 11am.",
  },
  {
    date: new Date(2023,6,9,11),
  },
];