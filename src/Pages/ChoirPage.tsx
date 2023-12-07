import React from 'react';
import styles from "./ChoirPage.module.css";
import Header from "../Components/PageElements/Header";
import ChoirInfo from "../Components/ChoirPage/ChoirInfo";
import Player from "../Components/Player/Player";
import Api from "../Utiles/Api";
import log from "loglevel";
import {defaultPage, IPage} from "../Domain/IPage";
import ImageGallery from "../Components/Carousel/ImageGallery";

interface IState {
  selectedDate: Date;
  page: IPage
}

export default class ChoirPage extends React.Component<{}, IState> {
  static displayName = ChoirPage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      page: defaultPage
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    try {
      Api.getPage('choir').then((page) => {
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
            <p className={styles.left}>Choir at Church of St. Ladislaus</p>
          </div>
        </Header>

        <div className={`body`}>
          <div className={styles.choirInfoContainer}>

            <ChoirInfo className={styles.bibleGroupInfo} images={['/img/songs.png', '/img/choir.png']}/>
            <Player title="Some Choir Recordings"/>

          </div>

          <ImageGallery
            images={this.state.page.images ?? []}
          />

        </div>
      </div>
    );
  }
}