import React, {useEffect, useState} from 'react';
import './HomePage.css';
import {useLocation} from "react-router-dom";
import Api from "../Utiles/Api";
import log from "loglevel";
import styles from "./NewsPage.module.css";
import Header from "../Components/PageElements/Header";
import BlurContainer from "../Components/PageElements/BlurContainer";
import {IPage} from "../Domain/IPage";
import Loading from "../Components/PageElements/Loading";
import {NotFound} from "../Components/StyledComponents/NotFound";
import {Image} from "../Components/StyledComponents/Image";
import {useScrollToTop} from "../hookcs/useScrollToTop";
import ImageViewer from "../Components/Carousel/ImageViewer";
import {EventEmitter, POPUP_SHOWN} from "../Utiles/EventEmitter";

interface IProps {
}

const NewsPage: React.FC<IProps> = () => {
  const location = useLocation();
  const [page, setPage] = React.useState<IPage>();
  const [loading, setLoading] = React.useState(true);
  const [containerHeight, setContainerHeight] = useState<number>( 0);
  useScrollToTop();

  useEffect(() => {
    const pageSegment = location.pathname.split("/")[1];

    if (pageSegment) {
      try {
        Api.getPage(pageSegment).then((pageInfo) => {
          if (pageInfo) {
            setPage(pageInfo);
          }
          setLoading(false);
        });
      } catch (e) {
        log.info(e);
      }
    }
  }, [location]);

  if (loading) return (<div className='body center'><Loading/></div>);

  if (!page) return (
    <div className='body center'>
      <NotFound/>
    </div>
  );

  return (
    <div>
      {page?.title
        ? <Header>
          <div className={styles.titleContainer}>
            <p>{page.title}</p>
          </div>
        </Header>
        : null}

      <div className={`body`}>
        <div className={styles.bodyContainer} style={{minHeight:containerHeight}}>
          {page?.mainImage
            ? <Image
              className={styles.image}
              alt='Main'
              selfSrc={page.mainImage}
              onSizeChange={s => setContainerHeight(s.size.height)}
            />
            : null}

          {page?.body ?
            <div className={styles.additionalBibleGroupInfoContainer}>
              <BlurContainer
                title={page.title}
                className={page.mainImage ? styles.mainTextContainer : styles.mainTextContainerWithoutImage}
              >
                <div dangerouslySetInnerHTML={{__html: page.body}}/>

                {page?.images?.length ?
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
              </BlurContainer>
            </div>
          :null}
        </div>
      </div>
      <ImageViewer images={page?.images}/>
    </div>
  );
}

export default NewsPage;