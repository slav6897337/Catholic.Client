import {FunctionComponent, useState} from "react";
import styles from "./Note.module.css";
import {INote} from "../Domain/INote";
import moment from "moment";

const defaultNote: INote = {
  title: "Weekly gathering",
  date: "Thursday: 6:00 PM",
  additionalTitle: "Dom Quo Vadis",
  info: "Hurbanovo námestie 1, 811 03 Bratislava"
}
const Note: FunctionComponent = () => {
  const [note, setNote] = useState<INote>(defaultNote);
  return (
    <div className={styles.noteContainer}>
      <div className={styles.noteTitleContainer}>
        <h1 className={styles.noteTitle}>
          {note.title}
        </h1>
        <p className={styles.noteDate}>{note.date}</p>
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
