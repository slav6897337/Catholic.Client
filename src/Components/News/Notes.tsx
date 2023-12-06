import {FunctionComponent, useEffect, useState} from "react";
import styles from "./Notes.module.css";
import {defaultNotes, INote} from "../../Domain/INote";
import Note from "./Note";
import Carousel from "../Carousel/Carousel";
import Api from "../../Utiles/Api";
import Loading from "../PageElements/Loading";

interface IProps {
  notesContainer?: string;
  holyMassOnly?: boolean;
  homeNotes?: boolean;
}

const Notes: FunctionComponent<IProps> = (props) => {
  const [notesData, setNotes] = useState<INote[]>([{...defaultNotes, info:'<div></div>'}]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    Api.getAllNotes().then((response) => {
      if(props.homeNotes) response = response.filter(n => n.isHomeNote);
      if(props.holyMassOnly) response = response.filter(n => n.isChurchNote);
      setNotes(response);
      setLoading(false);
    });
  };

  const notes = notesData.map(noteData => <Note note={noteData} loading={loading}/>);

  return (
    <Carousel
      container={props.notesContainer ?? styles.notesContainer}
      items={notes}
      autoplay={{
        delay: 6000,
        disableOnInteraction: false
      }}
      navigation={false}
    />
  );
};

export default Notes;
