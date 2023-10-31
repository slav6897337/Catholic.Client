import React from 'react';
import styles from "./BibleGroupPage.module.css";
import Header from "../Components/PageElements/Header";
import BibleGroupInfo from "../Components/BibleGroupPage/BibleGroupInfo";
import Gallery from "../Components/Carousel/Gallery";
import ImageGallery from "../Components/Carousel/ImageGallery";
import Api from "../Utiles/Api";
import log from "loglevel";
import {defaultPage, IPage} from "../Domain/IPage";

interface IState {
  selectedDate: Date;
  page: IPage
}

export default class BibleGroupPage extends React.Component<{}, IState> {
  static displayName = BibleGroupPage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      page: defaultPage
    };
  }

  componentDidMount() {
    try {
      Api.getPage('english-bible-group').then((page) => {
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
      <div className={styles.body}>
        <Header>
          <div className={styles.titleContainer}>
            <p className={styles.left}>English Bible group</p>
          </div>
        </Header>

        <div className={styles.bibleGroupInfoContainer}>
          <img className={styles.image} alt='Bible' src={'/img/bible-rosary.png'}/>
          <div className={styles.additionalBibleGroupInfoContainer}>
            <BibleGroupInfo className={styles.bibleGroupInfo} body={this.state.page.body}/>
          </div>
        </div>

        <ImageGallery
          images={this.state.page.images ?? []}
          title={'Image Gallery'}
        />
      </div>
    );
  }
}