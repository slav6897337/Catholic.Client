import React, {useEffect} from 'react';
import './HomePage.css';
import {useLocation} from "react-router-dom";
import Api from "../Utiles/Api";
import log from "loglevel";
import Gallery from "../Components/Carousel/Gallery";
import styles from "./NewsPage.module.css";
import Header from "../Components/PageElements/Header";
import BlurContainer from "../Components/PageElements/BlurContainer";
import {IPage} from "../Domain/IPage";
import Loading from "../Components/PageElements/Loading";
import ImageGallery from "../Components/Carousel/ImageGallery";

interface IProps {

}

interface IState {
  selectedDate: Date;
}

const NewsPage: React.FC<IProps> = (props) => {
  const location = useLocation();
  const [page, setPage] = React.useState<IPage>();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const pageSegment = location.pathname.split("/")[1];

    if (pageSegment) {
      try {
        Api.getPage(pageSegment).then((pageInfo) => {
          if (pageInfo) {
            if(pageInfo.images.length && !pageInfo.mainImage){
              const main = pageInfo.images.shift()
              pageInfo.mainImage = main ?? '';
            }
            setPage(pageInfo);
          }
          setLoading(false);
        });
      } catch (e) {
        log.info(e);
      }
    }
  }, [location]);

  if (loading) return (<Loading/>);

  if (!page) return (
    <div className={styles.body}>
      <p>Not Found</p>
    </div>
  );

  return (
    <div className={styles.body}>
      {page?.title
        ? <Header>
          <div className={styles.titleContainer}>
            <p className={styles.left}>English Bible group</p>
          </div>
        </Header>
        : null}

      <div>
        {page?.mainImage
          ? <img className={styles.image} alt='Main' src={Api.getImageUrl(page.mainImage)}/>
          : null}

        <div className={styles.additionalBibleGroupInfoContainer}>
          <BlurContainer className={page.mainImage ? styles.mainTextContainer : styles.mainTextContainerWithoutImage}>
            <div dangerouslySetInnerHTML={{ __html: page.body }} />
          </BlurContainer>
        </div>
      </div>

      <ImageGallery
        images={page.images}
        title={'Image Gallery'}
      />
    </div>
  );
}

export default NewsPage;