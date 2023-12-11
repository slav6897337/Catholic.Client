import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import styles from "./Page.module.css";
import Header from "../Components/PageElements/Header";
import ImageGallery from "../Components/Carousel/ImageGallery";
import Api from "../Utiles/Api";
import log from "loglevel";
import {defaultPage, IPage} from "../Domain/IPage";
import {Image} from "../Components/StyledComponents/Image";
import {useScrollToTop} from "../hookcs/useScrollToTop";
import {NotFound} from "../Components/StyledComponents/NotFound";
import BlurContainer from "../Components/PageElements/BlurContainer";
import {links} from "../Navigation/Lincks";

interface IPageProps {
  preloadPage?: IPage;
  onPageLoad: (page: IPage) => void;
  onLoading: (loading: boolean) => void;
  className?: string;
  blurContainer?: boolean;
  children: React.ReactNode;
}

export const Page: React.FC<IPageProps> = (
  {
    children,
    preloadPage,
    onPageLoad,
    onLoading,
    className,
    blurContainer = true
  }) => {
  useScrollToTop();
  const location = useLocation();
  const [page, setPage] = React.useState<IPage>(preloadPage ?? defaultPage);

  useEffect(() => {
    onLoading(true);

    if (pagePath) {
      try {
        Api.getPage(pagePath).then((pageInfo) => {
          if (pageInfo) {
            setPage(pageInfo);
            onPageLoad(pageInfo);
          }
          onLoading(false);
        });
      } catch (e) {
        log.info(e);
      }
    }
  }, [location]);

  const pagePath = location.pathname.split("/")[1];
  const isNotNewsPage = !links.some(l => l.path === `/${location.pathname}`);

  if (!page) return (
    <div className='body center'>
      <NotFound/>
    </div>
  );

  return (
    <>
      <Header>
        <div className={styles.titleContainer}>
          <p>{isNotNewsPage ? page.title : 'News'}</p>
        </div>
      </Header>
      <div className={`body ${styles.bodyAdditionalPadding}`}>
        {page.mainImage ?
          <Image className={styles.backgroundImage} alt='Bacground Image' selfSrc={page.mainImage}/>
          : null}

        {blurContainer ?
          <BlurContainer
            className={`${page.mainImage
              ? styles.bodyBlurContainerWithImageOnBack
              : styles.bodyBlurContainer} ${className}`}
            title={page.title}>
            {children}
          </BlurContainer>
          : children}

        {page.images.length && isNotNewsPage ?
          <ImageGallery
            className={styles.bodyImageGallery}
            images={page.images ?? []}
          />
          : null}
      </div>
    </>
  );

}
