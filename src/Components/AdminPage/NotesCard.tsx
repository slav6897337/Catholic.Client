import React, {FunctionComponent} from "react";
import styles from "./NewsCard.module.css";
import Button from "../StyledComponents/Button";
import Modal from "../PageElements/Modal";
import Api from "../../Utiles/Api";
import WhiteContainer from "../PageElements/WhiteContainer";
import NavButton from "../StyledComponents/NavButton";
import {INote} from "../../Domain/INote";
import {EventEmitter, POPUP_HIDDEN, POPUP_SHOWN} from "../../Utiles/EventEmitter";

interface IProps {
  notes: INote;
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  adminToken: string;
  onChange: () => void;
}

const NewsCard: FunctionComponent<IProps> = (
  {
    notes,
    adminToken,
    onChange,
    titleStyle,
    titleClassName,
    className,
    style
  }) => {
  const handleDelete = async () => {
    await Api.deleteNews(notes.id, adminToken);
    onChange();
    EventEmitter.trigger(POPUP_HIDDEN);
  };

  return (
    <>
      <WhiteContainer title={notes.title} date={notes.date}>
        <div className={styles.pageCardContainer}>
          <NavButton className={styles.button} icon='/icons/edit.png' text='Edit' to={`/admin/edit-notes/${notes.id}`}/>
          <Button
            className={styles.button}
            icon='/icons/delete.png'
            text='Delete'
            onClick={() => EventEmitter.trigger(POPUP_SHOWN,
              <Modal
                title='Are you certain you want to remove this page?'
                okOnClick={handleDelete}
                cancelButton={true}/>
            )}/>
          <div className={styles.domain}>
            {notes.isHomeNote ? <p className={styles.isHomeNews}>Catholic.sk</p> : null}
            {notes.isChurchNote ? <p className={styles.isChurchNews}>Holymass.sk</p> : null}
          </div>
        </div>
      </WhiteContainer>
    </>

  );
}

export default NewsCard;
