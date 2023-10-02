import React from 'react';
import styles from "./LogInPage.module.css";
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
  name: string;
  pass: string;
  error: boolean;
}

export default class LogInPage extends React.Component<{}, IState> {
  static displayName = LogInPage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      pass: '',
      error: false,

    };
  }

  componentDidMount() {
    try {
      const adminInfo = AdminHelper.getAdminCredentials(false);
      if (adminInfo?.token) {
        window.open('/admin', '_self');
      }
    }
    catch (e) {
      log.info(e);
    }
  }

  handleSubmit = async () => {
    try {
      this.setState({loading: true});

      Api.login({name: this.state.name, pass: this.state.pass} as IAdmin).then((admin) => {
       AdminHelper.setAdminCredentials(admin);
      });
    } catch (e) {
      log.info(e);
    }
    this.setState({loading: false, error: true});
  };


  render() {

    if (this.state.loading) return (
      <div className={styles.body}>
        <Loading/>
      </div>);

    return (
      <div className={styles.body}>
        <BlurContainer title={"Log In to Admin Panel"}>
          {this.state.error ?
            <div className={styles.blockContainer}>
              <p className={`${styles.header} ${styles.error}`}>Wrong name or password</p>
            </div>
            : null}

          <div className={styles.blockContainer}>
            <p className={styles.header}>Name</p>
            <input className={styles.inputStyling}
                   type="text"
                   value={this.state.name}
                   onChange={e => this.setState({name: e.target.value, error:false })}/>
          </div>

          <div className={styles.blockContainer}>
            <p className={styles.header}>Password</p>
            <input className={styles.inputStyling}
                   type="text"
                   value={this.state.pass}
                   onChange={e => this.setState({pass: e.target.value, error:false })}/>
          </div>
          <div className={styles.blockContainer}>
            <Button icon='/icons/login.png' text='Log In' onClick={this.handleSubmit}/>
          </div>

        </BlurContainer>
      </div>
    );
  }
}