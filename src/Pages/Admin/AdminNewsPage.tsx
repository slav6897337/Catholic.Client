import React from 'react';
import styles from "./AdminPage.module.css";
import log from "loglevel";
import Api from "../../Utiles/Api";
import {IPage} from "../../Domain/IPage";
import Loading from "../../Components/PageElements/Loading";
import {IAdmin} from "../../Domain/IAdmin";
import AdminHelper from "../../Utiles/Admin";
import {INews} from "../../Domain/INews";
import NewsCard from "../../Components/AdminPage/NewsCard";
import AddCard from "../../Components/AdminPage/AddCard";
import {Breadcrumbs} from "../../Components/StyledComponents/Breadcrumbs";
import Body from "../../Components/PageElements/Body";

interface IState {
  loading: boolean;
  pages: IPage[];
  news: INews[];
  admin: IAdmin | null;
}

export default class AdminNewsPage extends React.Component<{}, IState> {
  static displayName = AdminNewsPage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      pages: [],
      news: [],
      admin: null
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getNews();
  }

  getNews = () =>{
    try {
      const adminInfo = AdminHelper.getAdminCredentials();

      Api.getAllNews().then((news) => {
        if (news?.length) {
          this.setState({
            loading: false,
            news: news,
            admin: adminInfo
          })
        }
      });
    } catch (e) {
      log.info(e);
    }
  }

  render() {

    if (this.state.loading) return (
      <Body center={true}>
        <Loading/>
      </Body>);

    return (
      <Body className={` ${styles.body}`}>

        <Breadcrumbs breadcrumbs={[{text: 'Admin', to: '/admin'}, {text: 'News'}]}/>

        <AddCard title='Add News' to='/admin/new-news'/>

        {this.state.news.map((news, index) => {
          return (
            <NewsCard news={news} key={index} adminToken={this.state.admin?.token ?? ''} onChange={this.getNews}/>
          );
        })}
      </Body>
    );
  }
}