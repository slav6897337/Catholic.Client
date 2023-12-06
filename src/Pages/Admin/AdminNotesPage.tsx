import React from 'react';
import styles from "./AdminPage.module.css";
import log from "loglevel";
import Api from "../../Utiles/Api";
import Loading from "../../Components/PageElements/Loading";
import {IAdmin} from "../../Domain/IAdmin";
import AdminHelper from "../../Utiles/Admin";
import AddCard from "../../Components/AdminPage/AddCard";
import {INote} from "../../Domain/INote";
import NotesCard from "../../Components/AdminPage/NotesCard";
import {Breadcrumbs} from "../../Components/StyledComponents/Breadcrumbs";

interface IState {
  loading: boolean;
  notes: INote[];
  admin: IAdmin | null;
}

export default class AdminNotesPage extends React.Component<{}, IState> {
  static displayName = AdminNotesPage.name;

  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      notes: [],
      admin: null
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getNotes();
  }

  getNotes = () =>{
    try {
      const adminInfo = AdminHelper.getAdminCredentials();

      Api.getAllNotes().then((notes) => {
        if (notes?.length) {
          this.setState({
            loading: false,
            notes: notes,
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
      <div className={`body center`}>
        <Loading/>
      </div>);

    return (
      <div className={`body ${styles.body}`}>
        <Breadcrumbs breadcrumbs={[{text: 'Admin', to: '/admin'}, {text: 'Notes'}]}/>

        {this.state.notes.map((notes, index) => {
          return (
            <NotesCard notes={notes} key={index} adminToken={this.state.admin?.token ?? ''} onChange={this.getNotes}/>
          );
        })}

        <AddCard title='Add News' to='/admin/new-notes'/>
      </div>
    );
  }
}