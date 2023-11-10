import React, {FunctionComponent} from "react";
import styles from "./AddCard.module.css";
import WhiteContainer from "../PageElements/WhiteContainer";
import NavButton from "../StyledComponents/NavButton";

interface IProps {
  title: string;
  to: string;
  titleClassName?: string;
  className?: string;
}

const AddCard: FunctionComponent<IProps> = ({title, to, titleClassName, className}) => {
  return (
    <>
      <WhiteContainer title={title}>
        <div className={styles.pageCardContainer}>
          <NavButton
            className={styles.button}
            icon='/icons/plus.png'
            iconClassName={styles.icon}
            to={to}
          />
        </div>
      </WhiteContainer>
    </>

  );
}

export default AddCard;
