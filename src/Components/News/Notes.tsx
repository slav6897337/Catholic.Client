import {FunctionComponent, useState} from "react";
import styles from "./Notes.module.css";
import {INote} from "../../Domain/INote";
import Note from "./Note";
import Carousel from "../Carousel/Carousel";

const defaultNote: INote = {
  title: "Bible group",
  date: "Thursday: 6:00 PM",
  additionalTitle: "Dom Quo Vadis",
  info: "Hurbanovo námestie 1, 811 03 Bratislava"
}
const defaultNote2: INote = {
  title: "Holly Mass",
  date: "Sunday: 11:00 am",
  additionalTitle: "St. Ladislav church",
  info: "Špitálska 7, 812 50 Bratislava"
}
const Notes: FunctionComponent = () => {
  const [notesData, setNote] = useState<INote[]>([defaultNote, defaultNote2]);
  const notes = notesData.map(noteData => <Note note={noteData}/>);
  return (
    <Carousel
      containerClassName={styles.notesContainer}
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
