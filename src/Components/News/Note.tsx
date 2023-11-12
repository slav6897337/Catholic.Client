import {FunctionComponent} from "react";
import styles from "./Note.module.css";
import {INote} from "../../Domain/INote";
import moment from "moment/moment";


const Note: FunctionComponent<{note: INote}> = ({note}) => {

  return (
    <div className={styles.noteContainer}>
      <div className={styles.noteInfo} dangerouslySetInnerHTML={{__html: note.info}}/>
    </div>
  );
};

export default Note;
