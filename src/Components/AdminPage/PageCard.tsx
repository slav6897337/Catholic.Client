import React, {FunctionComponent} from "react";
import styles from "./PageCard.module.css";
import {IPage} from "../../Domain/IPage";
import Button from "../StyledComponents/Button";
import Actions from "../../Utiles/Actions";
import Modal from "../PageElements/Modal";
import Api from "../../Utiles/Api";
import WhiteContainer from "../PageElements/WhiteContainer";
import NavButton from "../StyledComponents/NavButton";

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
      <WhiteContainer title={page.title}>
        <div className={styles.pageCardContainer}>
          <Button className={styles.button} icon='/icons/view.png' text='View'
                  onClick={() => Actions.redirect(page.urlSegment)}/>
          <NavButton className={styles.button} icon='/icons/edit.png' text='Edit' to={`/admin/edit/${page.urlSegment}`}/>
          {page.urlSegment !== 'home' && page.urlSegment !== 'holy-mass'
            ? <Button className={styles.button} icon='/icons/delete.png' text='Delete'
                      onClick={() => setShowDeletePopup(true)}/>
            : null}
        </div>

      </WhiteContainer>
    </>

  );
}

export default PageCard;
