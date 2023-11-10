import React, {FunctionComponent} from "react";
import styles from "./NewsCard.module.css";
import Button from "../StyledComponents/Button";
import Modal from "../PageElements/Modal";
import Api from "../../Utiles/Api";
import WhiteContainer from "../PageElements/WhiteContainer";
import NavButton from "../StyledComponents/NavButton";
import {INote} from "../../Domain/INote";

interface IProps {
  notes: INote;
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  adminToken: string;
  onChange: () => void;
}

const NewsCard: FunctionComponent<IProps> = ({notes, adminToken, onChange, titleStyle, titleClassName, className, style}) => {

  const [showDeletePopup, setShowDeletePopup] = React.useState(false);
  const handleDelete = async () => {
    await Api.deleteNews(notes.id, adminToken);
    onChange();
    setShowDeletePopup(false);
  };

  return (
    <>
      {showDeletePopup
        ? <Modal
          title='Are you certain you want to remove this page?'
          okOnClick={handleDelete}
          cancelOnClick={() => setShowDeletePopup(false)}/>
        : null}
      <WhiteContainer title={notes.title}>
        <div className={styles.pageCardContainer}>
          <NavButton className={styles.button} icon='/icons/edit.png' text='Edit' to={`/admin/edit-notes/${notes.id}`}/>
          <Button className={styles.button} icon='/icons/delete.png' text='Delete' onClick={() => setShowDeletePopup(true)}/>
        </div>

      </WhiteContainer>
    </>

  );
}

export default NewsCard;