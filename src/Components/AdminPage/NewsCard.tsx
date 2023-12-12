import React, {FunctionComponent} from "react";
import styles from "./NewsCard.module.css";
import Button from "../StyledComponents/Button";
import Actions from "../../Utiles/Actions";
import Modal from "../PageElements/Modal";
import Api from "../../Utiles/Api";
import WhiteContainer from "../PageElements/WhiteContainer";
import {INews} from "../../Domain/INews";
import NavButton from "../StyledComponents/NavButton";
import {EventEmitter, POPUP_HIDDEN, POPUP_SHOWN} from "../../Utiles/EventEmitter";

interface IProps {
  news: INews
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  adminToken: string;
  onChange: () => void;
}

const NewsCard: FunctionComponent<IProps> = (
  {
    news,
    adminToken,
    onChange,
    titleStyle,
    titleClassName,
    className,
    style
  }) => {

  const [loading, setLoading] = React.useState(false);
  const handleDelete = async () => {
    setLoading(true);
    await Api.deleteNews(news.id, adminToken);
    onChange();
    EventEmitter.trigger(POPUP_HIDDEN);
    setLoading(false);
  };

  return (
    <>
      <WhiteContainer title={news.title} date={news.date}>
        <div className={styles.pageCardContainer}>
          {news.link && <Button className={styles.button} icon='/icons/view.png' text='View'
                                onClick={() => Actions.redirect(news.link ?? '')}/>}
          <NavButton className={styles.button} icon='/icons/edit.png' text='Edit' to={`/admin/edit-news/${news.id}`}/>
          <Button
            className={styles.button}
            icon='/icons/delete.png'
            text='Delete'
            onClick={() => EventEmitter.trigger(POPUP_SHOWN,
              <Modal
                title='Are you certain you want to remove this news?'
                okOnClick={handleDelete}
                loading={loading}
                cancelButton={true}
              />
            )}/>

          <div className={styles.domain}>
            {news.isHomeNews ? <p className={styles.isHomeNews}>Catholic.sk</p> : null}
            {news.isChurchNews ? <p className={styles.isChurchNews}>Holymass.sk</p> : null}
          </div>

        </div>
      </WhiteContainer>
    </>

  );
}

export default NewsCard;
