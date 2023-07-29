import React from 'react';
import styles from "./BibleGroupPage.module.css";
import Header from "../Components/PageElements/Header";
import BibleGroupInfo from "../Components/BibleGroupPage/BibleGroupInfo";
import Gallery from "../Components/Carousel/Gallery";

interface IState {
  selectedDate: Date;
}

export default class BibleGroupPage extends React.Component<{}, IState> {
  static displayName = BibleGroupPage.name;

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
            <p className={styles.left}>English Bible group</p>
          </div>
        </Header>

        <div className={styles.bibleGroupInfoContainer}>
          <img className={styles.image} alt='Bible' src={'/img/bible-rosary.png'}/>
          <div className={styles.additionalBibleGroupInfoContainer}>
            <BibleGroupInfo className={styles.bibleGroupInfo}/>
          </div>
        </div>

        <Gallery
          title={'Image Gallery'}
          items={imagesData.map((item, index) => (
            <img src={item.imgPath} alt={item.label}/>
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