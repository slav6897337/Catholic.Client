import React from 'react';
import styles from "./AdminPage.module.css";
import log from "loglevel";
import Api from "../../Utiles/Api";
import {IPage} from "../../Domain/IPage";
import Loading from "../../Components/PageElements/Loading";
import PageCard from "../../Components/AdminPage/PageCard";
import Modal from "../../Components/PageElements/Modal";
import BlurContainer from "../../Components/PageElements/BlurContainer";
import Button from "../../Components/StyledComponents/Button";
import Actions from "../../Utiles/Actions";
import {IAdmin} from "../../Domain/IAdmin";
import AdminHelper from "../../Utiles/Admin";
import WhiteContainer from "../../Components/PageElements/WhiteContainer";
import {INews} from "../../Domain/INews";
import AddCard from "../../Components/AdminPage/AddCard";

interface IState {
  loading: boolean;
  pages: IPage[];
  admin: IAdmin | null;
}

export default class AdminPage extends React.Component<{}, IState> {
  static displayName = AdminPage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      pages: [],
      admin: null
    };
  }

  componentDidMount() {
    try {
      const adminInfo = AdminHelper.getAdminCredentials();

      Api.getPages().then((pages) => {
        if (pages.length) {
          Api.getNews({take: 1000, skip: 0, holyMassOnly: false}).then((news) => {
            if (news?.items?.length) {

              console.log(pages.map(p => !news.items.some(n => p.urlSegment === n.link)));
              pages = pages.filter(p => !news.items.some(n => p.urlSegment === n.link));

              this.setState({
                loading: false,
                pages: pages,
                admin: adminInfo,
              })
            }
          });
        }
      });

    } catch (e) {
      log.info(e);
    }
  }


  render() {

    if (this.state.loading) return (
      <div className={styles.body}>
        <Loading/>
      </div>);

    return (
      <div className={styles.body}>


        {this.state.pages.map((page, index) => {
          return (
            <PageCard page={page} key={index}/>
          );
        })}
        <WhiteContainer title={"News"}>
          <Button
            className={styles.nButton}
            text='Manage news'
            textClassName={styles.nButtonText}
            icon='/icons/news.png'
            onClick={() => Actions.redirect('admin/news')}
          />
        </WhiteContainer>

        <AddCard title='Create New Page' onClick={() => Actions.redirect('admin/new-page')}/>

      </div>
    );
  }
}