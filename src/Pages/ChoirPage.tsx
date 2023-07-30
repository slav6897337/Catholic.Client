import React from 'react';
import styles from "./ChoirPage.module.css";
import Header from "../Components/PageElements/Header";
import Gallery from "../Components/Carousel/Gallery";
import ChoirInfo from "../Components/ChoirPage/ChoirInfo";
import Player from "../Components/Player/Player";

interface IState {
  selectedDate: Date;
}

export default class ChoirPage extends React.Component<{}, IState> {
  static displayName = ChoirPage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedDate: new Date()
    };
  }

  render() {
    return (
      <div className={styles.body}>
        <Header>
          <div className={styles.titleContainer}>
            <p className={styles.left}>Choir at Church of St. Ladislaus</p>
          </div>
        </Header>

        <div className={styles.choirInfoContainer}>

          <ChoirInfo className={styles.bibleGroupInfo} images={['/img/songs.png', '/img/choir.png']}/>
          <Player title="Some Choir Recordings"/>

        </div>


        <Gallery
          title={'Image Gallery'}
          items={imagesData.map((item, index) => (
            <img key={index} src={item.imgPath} alt={item.label}/>
          ))}/>
      </div>
    );
  }
}

const imagesData = [
  {
    label: 'Holly Mass',
    imgPath: '/img/reading.png',
  },
  {
    label: 'Bible',
    imgPath: '/img/bible.png',
  },
  {
    label: 'Bible',
    imgPath:
      '/img/bible-rosary.png',
  },
  {
    label: 'Reading',
    imgPath: '/img/reading.png',
  },
];