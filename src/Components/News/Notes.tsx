import {FunctionComponent, useEffect, useState} from "react";
import styles from "./Notes.module.css";
import {INote} from "../../Domain/INote";
import Note from "./Note";
import Carousel from "../Carousel/Carousel";
import Api from "../../Utiles/Api";
import {IRequestQuery} from "../../Domain/IRequestQuery";
import Loading from "../PageElements/Loading";

interface IProps {
  notesContainer?: string;
  holyMassOnly?: boolean;
}

const Notes: FunctionComponent<IProps> = (props) => {
  const [notesData, setNotes] = useState<INote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const request: IRequestQuery = {holyMassOnly: props.holyMassOnly, skip: 0, take: 5};

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    Api.getNotes(request).then((response) => {
      setNotes(response);
      setLoading(false);
    });
  };

  const notes = notesData.map(noteData => <Note note={noteData}/>);

  if(loading) return (<Loading />);

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
