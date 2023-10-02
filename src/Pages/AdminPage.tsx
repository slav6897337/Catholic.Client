import React from 'react';
import styles from "./AdminPage.module.css";
import log from "loglevel";
import Api from "../Utiles/Api";
import {IPage} from "../Domain/IPage";
import Loading from "../Components/PageElements/Loading";
import PageCard from "../Components/AdminPage/PageCard";
import Modal from "../Components/PageElements/Modal";
import BlurContainer from "../Components/PageElements/BlurContainer";
import Button from "../Components/StyledComponents/Button";
import Actions from "../Utiles/Actions";
import {IAdmin} from "../Domain/IAdmin";
import AdminHelper from "../Utiles/Admin";

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
      this.setState({admin: adminInfo});

      Api.getPages().then((pages) => {
        if (pages.length) {
          this.setState({
            loading: false,
            pages: pages
          })
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
        <BlurContainer title={"New Page"}>
          <Button icon='/icons/add.png' text='Create' onClick={() => Actions.redirect('admin/new-page')}/>
        </BlurContainer>
        {this.state.pages.map((page, index) => {
          return (
            <PageCard page={page} key={index}/>
          );
        })}
      </div>
    );
  }
}