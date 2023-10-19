import React, {FunctionComponent} from "react";
import styles from "./AddCard.module.css";
import Button from "../StyledComponents/Button";
import WhiteContainer from "../PageElements/WhiteContainer";

interface IProps {
  title: string;
  onClick: () => void;
  titleClassName?: string;
  className?: string;
}

const AddCard: FunctionComponent<IProps> = ({title, onClick, titleClassName, className}) => {
  return (
    <>
      <WhiteContainer title={title}>
        <div className={styles.pageCardContainer}>
          <Button
            className={styles.button}
            icon='/icons/plus.png'
            iconClassName={styles.icon}
            onClick={onClick}
          />
        </div>
      </WhiteContainer>
    </>

  );
}

export default AddCard;
