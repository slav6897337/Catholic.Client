import React, {FunctionComponent} from "react";
import styles from "./PageCard.module.css";
import {IPage} from "../../Domain/IPage";
import Button from "../StyledComponents/Button";
import Actions from "../../Utiles/Actions";
import Modal from "../PageElements/Modal";
import Api from "../../Utiles/Api";
import WhiteContainer from "../PageElements/WhiteContainer";
import NavButton from "../StyledComponents/NavButton";
import {EventEmitter, POPUP_HIDDEN, POPUP_SHOWN} from "../../Utiles/EventEmitter";


interface IProps {
  page: IPage
  adminToken: string;
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  onDelete?: () => void;
}


const PageCard: FunctionComponent<IProps> = (
  {
    page,
    onDelete,
    adminToken,
    titleStyle,
    titleClassName,
    className,
    style
  }) => {
  const handleDelete = async () => {
    await Api.deletePage(page.id, adminToken);
    const images = [...page.images, page.mainImage];
    images.map(image => image ? Api.deleteImage(image, adminToken) : null);
    if (page.mainImage)
      if (onDelete) onDelete();
    EventEmitter.trigger(POPUP_HIDDEN);
  };

  return (
    <>
      <WhiteContainer title={page.title}>
        <div className={styles.pageCardContainer}>
          <Button className={styles.button} icon='/icons/view.png' text='View'
                  onClick={() => Actions.redirect(page.urlSegment === 'home' ? '/' : page.urlSegment)}/>
          <NavButton className={styles.button} icon='/icons/edit.png' text='Edit'
                     to={`/admin/edit/${page.urlSegment}`}/>
          {page.urlSegment !== 'home' && page.urlSegment !== 'holy-mass'
            ? <Button
              className={styles.button}
              icon='/icons/delete.png' text='Delete'
              onClick={() => EventEmitter.trigger(POPUP_SHOWN,
                <Modal
                  title='Are you certain you want to remove this page?'
                  okOnClick={handleDelete}
                  cancelButton={true}/>
              )}/>
            : null}
        </div>

      </WhiteContainer>
    </>

  );
}

export default PageCard;
