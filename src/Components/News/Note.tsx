import {FunctionComponent} from "react";
import styles from "./Note.module.css";
import {INote} from "../../Domain/INote";
import Loading from "../PageElements/Loading";


const Note: FunctionComponent<{note: INote, loading?: boolean}> = ({note, loading}) => {

  return (
    <div className={styles.noteContainer}>
      {loading ?
        <div style={{width:'6rem', height:'6rem', marginTop:'4rem'}}>
          <Loading width={'100%'} height={'100%'}/>
        </div>
        : null}
      <div className={styles.noteInfo} dangerouslySetInnerHTML={{__html: note.info}}/>
    </div>
  );
};

export default Note;
