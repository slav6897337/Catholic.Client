import React, {useEffect} from 'react';
import './HomePage.css';
import {useLocation} from "react-router-dom";
import Api from "../Utiles/Api";
import log from "loglevel";
import styles from "./NewsPage.module.css";
import Header from "../Components/PageElements/Header";
import BlurContainer from "../Components/PageElements/BlurContainer";
import {IPage} from "../Domain/IPage";
import Loading from "../Components/PageElements/Loading";
import ImageGallery from "../Components/Carousel/ImageGallery";
import {NotFound} from "../Components/StyledComponents/NotFound";

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
            if(pageInfo.images?.length && !pageInfo.mainImage){
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
    <div className='body center'>
      <NotFound/>
    </div>
  );

  return (
    <div className={`body`}>
      {page?.title
        ? <Header>
          <div className={styles.titleContainer}>
            <p>{page.title}</p>
          </div>
        </Header>
        : null}

      <div className={styles.bodyContainer}>
        {page?.mainImage
          ? <img className={styles.image} alt='Main' src={Api.getImageUrl(page.mainImage)}/>
          : null}

        <div className={styles.additionalBibleGroupInfoContainer}>
          <BlurContainer
            title={page.title}
            className={page.mainImage ? styles.mainTextContainer : styles.mainTextContainerWithoutImage}
          >
            <div dangerouslySetInnerHTML={{__html: page.body}}/>
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