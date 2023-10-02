import React, {FunctionComponent} from "react";
import styles from "./PageCard.module.css";
import {IPage} from "../../Domain/IPage";
import BlurContainer from "../PageElements/BlurContainer";
import Button from "../StyledComponents/Button";
import Actions from "../../Utiles/Actions";
import Modal from "../PageElements/Modal";
import Api from "../../Utiles/Api";
import {convertFromRaw, EditorState} from "draft-js";

const adminToken = process.env.REACT_APP_ADMIN_TOKEN ?? '';

interface IProps {
  page: IPage
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}


const PageCard: FunctionComponent<IProps> = ({page, titleStyle, titleClassName, className, style}) => {

  const [showDeletePopup, setShowDeletePopup] = React.useState(false);
  const handleDelete = async () => {
    await Api.deletePage(page.id, adminToken);

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
      <BlurContainer title={page.title}>
        <div className={styles.pageCardContainer}>
          <Button icon='/icons/view.png' text='View' onClick={() => Actions.redirect(page.urlSegment)}/>
          <Button icon='/icons/edit.png' text='Edit' onClick={() => Actions.redirect(`admin/edit/${page.urlSegment}`)}/>
          <Button icon='/icons/delete.png' text='Delete' onClick={() => setShowDeletePopup(true)}/>
        </div>

      </BlurContainer>
    </>

  );
}

export default PageCard;
