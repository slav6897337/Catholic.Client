import {FunctionComponent} from "react";
import styles from "./Note.module.css";
import {INote} from "../../Domain/INote";
import moment from "moment/moment";


const Note: FunctionComponent<{note: INote}> = ({note}) => {

  return (
    <div className={styles.noteContainer}>
      <div className={styles.noteTitleContainer}>
        <h1 className={styles.noteTitle}>
          {note.title}
        </h1>
        <p className={styles.noteDate}>{moment(note.date).format('MMMM D, h:mm a')}</p>
      </div>

      <h1 className={styles.noteAdditionalTitle}>
        {note.additionalTitle}
      </h1>

      <p className={styles.noteInfo}>
        {note.info}
      </p>
    </div>
  );
};

export default Note;
