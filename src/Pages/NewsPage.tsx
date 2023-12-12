import React from 'react';
import './HomePage.css';
import styles from "./NewsPage.module.css";
import {defaultPage, IPage} from "../Domain/IPage";
import Loading from "../Components/PageElements/Loading";
import {Image} from "../Components/StyledComponents/Image";
import {EventEmitter, POPUP_SHOWN} from "../Utiles/EventEmitter";
import {Page} from "./Page";

interface IProps {
}

const NewsPage: React.FC<IProps> = () => {
  const [page, setPage] = React.useState<IPage>(defaultPage);
  const [isNotNewsPage, setIsNotNewsPage] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(true);

  return (
      <Page
        onPageLoad={p => setPage(p)}
        onLoading={l => setLoading(l)}
        isNotNewsPageFlag={f => setIsNotNewsPage(f)}
      >
        {loading ? <Loading/> : null}
        <div dangerouslySetInnerHTML={{__html: page.body}}/>
        {page?.images?.length && isNotNewsPage?
          page?.images?.length > 1 ?
            <div className={styles.imagesContainer}>
              {page.images.map((image, index) => (
                <div key={index}
                     onClick={() => {
                       EventEmitter.trigger(POPUP_SHOWN, index);
                     }
                     }>
                  <Image
                    className={styles.smallImage}
                    alt='Main'
                    selfSrc={image}
                  />
                </div>
              ))}
            </div>
            : <Image
              className={styles.singleImage}
              alt='Main'
              selfSrc={page.images[0]}
            />
          : null}
      </Page>
  );
}

export default NewsPage;