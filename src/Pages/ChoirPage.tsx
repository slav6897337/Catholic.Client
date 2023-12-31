import React from 'react';
import styles from "./ChoirPage.module.css";
import ChoirInfo from "../Components/ChoirPage/ChoirInfo";
import Player from "../Components/Player/Player";
import {Page} from "./Page";

// const preloadPage: IPage = {
//   ...defaultPage,
//   title: 'Choir at Church of St. Ladislaus'
// };

const ChoirPage: React.FC = () => {
  //const [page, setPage] = React.useState<IPage>(preloadPage);

  return (
    <Page
      blurContainer={false}
      onPageLoad={() => {
      }}
      onLoading={() => {
      }}
    >
      <div className={styles.choirInfoContainer}>
        <ChoirInfo
          className={styles.bodyBlurContainerChoir}
          titleClassName={styles.titleBlurContainerChoir}
          images={['/img/songs.png', '/img/choir.png']}/>
        <Player title="Some Choir Recordings"/>
      </div>
    </Page>

  );
}


export default ChoirPage;