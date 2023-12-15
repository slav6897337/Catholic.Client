import React from 'react';
import './HomePage.css';
import Header from "../Components/PageElements/Header";
import Api from "../Utiles/Api";
import log from "loglevel";
import {INews} from "../Domain/INews";
import styles from "./ListNewsPage.module.css";
import SpecificNews from "../Components/News/SpecificNews";
import Loading from "../Components/PageElements/Loading";
import {defaultPage} from "../Domain/IPage";


interface IState {
  news: INews[];
  loading: boolean;
}

export default class ListNewsPage extends React.Component<{}, IState> {
  static displayName = ListNewsPage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      news: [],
      loading: true
    };
  }

  componentDidMount() {
    document.title = 'News' + defaultPage.title;
    window.scrollTo(0, 0);
    try {
      Api.getAllNews().then((news) => {
        this.setState({news, loading: false})
      });
    } catch (e) {
      log.info(e);
    }
  }


  render() {

    if (this.state.loading) {
      return (<div className={`body center`}><Loading/></div>);
    }

    return (
      <div>
        <Header>
          <div className={styles.titleContainer}>
            <p>News</p>
          </div>
        </Header>
        <div className={`body`}>
          <div className={styles.newsContainer}>
            {this.state.news.length ? this.state.news.map((item, index) =>
              <SpecificNews
                key={index}
                title={item.title}
                date={item.date}
                description={item.description}
                link={item.link}
                image={item.image}
              />) : null}
          </div>
        </div>
      </div>
    );
  }
}