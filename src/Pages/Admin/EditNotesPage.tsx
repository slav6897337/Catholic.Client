import React, {FunctionComponent, useEffect} from 'react';
import log from "loglevel";
import Api from "../../Utiles/Api";
import Loading from "../../Components/PageElements/Loading";
import {useParams} from "react-router-dom";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styles from "./EditNewsPage.module.css";
import Button from "../../Components/StyledComponents/Button";
import AdminHelper from "../../Utiles/Admin";
import {IAdmin} from "../../Domain/IAdmin";
import Checkbox from "../../Components/StyledComponents/Checkbox";
import {defaultNotes, INote} from "../../Domain/INote";

const EditNotesPage: FunctionComponent = () => {
  const {id} = useParams();
  const [admin, setAdmin] = React.useState<IAdmin | null>(null);
  const [notes, setNotes] = React.useState<INote>(defaultNotes);
  const [loading, setLoading] = React.useState<boolean>(true);


  useEffect(() => {
    const admin = AdminHelper.getAdminCredentials();
    setAdmin(admin);

    if (!id) {
      setLoading(false);
      return;
    }
    try {
      Api.getAllNotes().then((notesResponse) => {
        const note = notesResponse?.find((item) => item.id === id);
        if (note) {
          setNotes(note);
          setLoading(false);
        }
      });
    } catch (e) {
      log.info(e);
    }
  }, []);

  const save = async () => {
    setLoading(true);
    if (!notes) return;

    let newNotes: INote;

    if (!notes.id) {
      newNotes = await Api.createNote(notes, admin?.token ?? '');
    } else {
      newNotes = await Api.updateNote(notes.id, notes, admin?.token ?? '');
    }
    setLoading(false);
    setNotes(newNotes);

    window.history.back();

  };

  if (loading) return (
    <div className={`body center`}>
      <Loading/>
    </div>);

  return (
    <div className={`body padding-top`}>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Title</p>
        <input className={styles.inputStyling} type="text" value={notes.title}
               onChange={e => setNotes({...notes, title: e.target.value} as INote)}/>
      </div>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Date</p>
        <input className={styles.inputStyling} type="text" value={notes.date}
               onChange={e => setNotes({...notes, date: e.target.value} as INote)}/>
      </div>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Second Tittle</p>
        <input className={styles.inputStyling} type="text" value={notes.additionalTitle}
               onChange={e => setNotes({...notes, additionalTitle: e.target.value} as INote)}/>
      </div>

      <div className={styles.blockContainer}>
        <p className={styles.header}>Info</p>
        <input className={styles.inputStyling} type="text" value={notes.info}
               onChange={e => setNotes({...notes, info: e.target.value} as INote)}/>
      </div>

      <Checkbox
        value={notes.isHomeNote}
        text='Show on Catholic.sk'
        onClick={isHomeNote => setNotes({...notes, isHomeNote} as INote)}
      />

      <Checkbox
        value={notes.isChurchNote}
        text='Show on Hollymass.sk'
        onClick={isChurchNote => setNotes({...notes, isChurchNote} as INote)}
      />

      <Button
        className={styles.saveButton}
        icon='/icons/save.png'
        text='Save'
        onClick={save}/>

    </div>
  );
}


export default EditNotesPage;