import React from "react";
import BlurContainer from "../PageElements/BlurContainer";
import styles from "./ChoirInfo.module.css";

interface IProps {
  titleStyle?: React.CSSProperties;
  titleClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  images?: string[];
}

const ChoirInfo: React.FC<IProps> = (props) => {
  return (
    <BlurContainer
      title='The Choir'
      {...props}
    >
      <div className={styles.horizontalContainer}>
        <div>
          <p>
            Welcome to the choir!
          </p>
          <p>
            We are an enthusiastic group who seek to serve the Lord through music. Each week we
            prepare the songs for the Sunday English mass at church and lead the congregation in singing them. All who are
            interested are invited to join the choir.
          </p>
        </div>
        {props.images?.length && <img className={styles.rightImg} src={props.images[0]} alt="Songs"/>}
      </div>
        <div className={styles.horizontalContainer}>
          {props.images && props.images.length > 1 && <img className={styles.leftImg} src={props.images[1]} alt="Songs"/>}

          <div>
            <p>
              We regularly practice on Sundays at 10:30 am to go through the songs prior to the 11 am mass. If you have any
              questions, please do not hesitate to visit us by coming up to the balcony before or after mass. We're easy to
              find!
            </p>
            <p>
              For more information contact us at: info@catholic.sk
            </p>
          </div>
        </div>



    </BlurContainer>
  );
}

export default ChoirInfo;