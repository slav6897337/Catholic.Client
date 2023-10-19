import React, {FunctionComponent} from "react";
import styles from "./NewsCard.module.css";
import Button from "../StyledComponents/Button";
import Actions from "../../Utiles/Actions";
import Modal from "../PageElements/Modal";
import Api from "../../Utiles/Api";
import WhiteContainer from "../PageElements/WhiteContainer";
import {INews} from "../../Domain/INews";

interface IProps {
  news: INews
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  adminToken: string;
}

const NewsCard: FunctionComponent<IProps> = ({news, adminToken, titleStyle, titleClassName, className, style}) => {

  const [showDeletePopup, setShowDeletePopup] = React.useState(false);
  const handleDelete = async () => {
    await Api.deleteNews(news.id, adminToken);

    setShowDeletePopup(false)
  };

  return (
    <>
      {showDeletePopup
        ? <Modal
          title='Are you certain you want to remove this page?'
          okOnClick={handleDelete}
          cancelOnClick={() => setShowDeletePopup(false)}/>
        : null}
      <WhiteContainer title={news.title}>
        <div className={styles.pageCardContainer}>
          {news.link && <Button className={styles.button} icon='/icons/view.png' text='View' onClick={() => Actions.redirect(news.link ?? '')}/>}
          <Button className={styles.button} icon='/icons/edit.png' text='Edit' onClick={() => Actions.redirect(`admin/edit-news/${news.id}`)}/>
          <Button className={styles.button} icon='/icons/delete.png' text='Delete' onClick={() => setShowDeletePopup(true)}/>
        </div>

      </WhiteContainer>
    </>

  );
}

export default NewsCard;
