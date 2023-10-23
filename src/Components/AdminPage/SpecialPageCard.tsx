import React, {FunctionComponent} from "react";
import styles from "./PageCard.module.css";
import Button from "../StyledComponents/Button";
import Actions from "../../Utiles/Actions";
import WhiteContainer from "../PageElements/WhiteContainer";

interface IProps {
  title: string;
  url: string;
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
}

const SpecialPageCard: FunctionComponent<IProps> = ({title, url, titleStyle, titleClassName, className, style}) => {
  return (
    <WhiteContainer title={title}>
      <div className={styles.pageCardContainer}>
        <Button className={styles.button} icon='/icons/view.png' text='View'
                onClick={() => Actions.redirect(url)}/>
        <Button className={styles.button} icon='/icons/edit.png' text='Edit'
                onClick={() => Actions.redirect(`admin/edit/${url}`)}/>
      </div>
    </WhiteContainer>
  );
}

export default SpecialPageCard
