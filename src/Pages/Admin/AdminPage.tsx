import React from 'react';
import styles from "./AdminPage.module.css";
import log from "loglevel";
import Api from "../../Utiles/Api";
import {IPage} from "../../Domain/IPage";
import Loading from "../../Components/PageElements/Loading";
import PageCard from "../../Components/AdminPage/PageCard";
import {IAdmin} from "../../Domain/IAdmin";
import AdminHelper from "../../Utiles/Admin";
import WhiteContainer from "../../Components/PageElements/WhiteContainer";
import AddCard from "../../Components/AdminPage/AddCard";
import NavButton from "../../Components/StyledComponents/NavButton";
import {Breadcrumbs} from "../../Components/StyledComponents/Breadcrumbs";

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
    window.scrollTo(0, 0);
    this.getPages();
  }

  getPages(){
    try {
      const adminInfo = AdminHelper.getAdminCredentials();

      Api.getPages().then((pages) => {
        if (pages.length) {
          Api.getAllNews().then((news) => {
            if (news?.length) {
              pages = pages.filter(p => !news.some(n => p.urlSegment === n.link));

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
      <div className={`body center`}>
        <Loading/>
      </div>);


    return (
      <div className={`body ${styles.body}`}>

        <Breadcrumbs breadcrumbs={[{text: 'Admin'}]}/>

        {this.state.pages
          .sort((p1, p2) =>
            p1.urlSegment === 'home' ? -2 :
              p1.urlSegment === 'holy-mass' ? -1 : 1)
          .map((page, index) => {
            return (
              <PageCard page={page} key={index} adminToken={this.state.admin?.token ?? ''} onDelete={() => this.getPages()}/>
            );
          })}
        <WhiteContainer title={"News"}>
          <NavButton
            className={styles.nButton}
            text='Manage news'
            textClassName={styles.nButtonText}
            icon='/icons/news.png'
            to='news'
          />
        </WhiteContainer>

        <WhiteContainer title={"Notes"}>
          <NavButton
            className={styles.nButton}
            text='Manage notes'
            textClassName={styles.nButtonText}
            icon='/icons/notes.png'
            to='notes'
          />
        </WhiteContainer>

        <AddCard title='Create New Page' to='new-page'/>

      </div>
    );
  }
}